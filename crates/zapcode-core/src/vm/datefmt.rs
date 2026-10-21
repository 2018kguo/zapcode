//! Date string formatting: `toString`, `toDateString`, `toTimeString`,
//! `toUTCString` and the `toLocale*String` family. The sandbox runs in UTC with
//! no ICU data, so locale output is always en-US and the `timeZone` option is
//! ignored. Expected strings in the tests are Node's.

use std::sync::Arc;

use indexmap::IndexMap;

use super::civil_from_days;
use crate::heap::Heap;
use crate::value::Value;

const DAYS: [&str; 7] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const MONTHS: [&str; 12] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

struct Fields {
    year: i64,
    month: usize, // 1-12
    day: u32,
    dow: usize, // 0 = Sunday
    hour: i64,
    minute: i64,
    second: i64,
}

fn fields(millis: i64) -> Fields {
    let seconds = millis.div_euclid(1000);
    let days = seconds.div_euclid(86_400);
    let sod = seconds.rem_euclid(86_400);
    let (year, month, day) = civil_from_days(days);
    Fields {
        year,
        month: month as usize,
        day,
        dow: (days + 4).rem_euclid(7) as usize,
        hour: sod / 3_600,
        minute: (sod % 3_600) / 60,
        second: sod % 60,
    }
}

/// Format `millis` for one of the string methods above; `None` for any other method.
pub(crate) fn format_date(
    millis: i64,
    method: &str,
    opts: Option<&IndexMap<Arc<str>, Value>>,
    heap: &Heap,
) -> Option<String> {
    let f = fields(millis);
    let short = |s: &str| s[..3].to_string();
    let date = format!(
        "{} {} {:02} {:04}",
        short(DAYS[f.dow]),
        short(MONTHS[f.month - 1]),
        f.day,
        f.year
    );
    let time = format!("{:02}:{:02}:{:02}", f.hour, f.minute, f.second);
    const ZONE: &str = "GMT+0000 (Coordinated Universal Time)";
    Some(match method {
        "toString" => date_to_string(millis),
        "toDateString" => date,
        "toTimeString" => format!("{time} {ZONE}"),
        "toUTCString" | "toGMTString" => format!(
            "{}, {:02} {} {:04} {time} GMT",
            short(DAYS[f.dow]),
            f.day,
            short(MONTHS[f.month - 1]),
            f.year
        ),
        "toLocaleDateString" => locale_date(&f, &Opts::new(opts, heap), true),
        "toLocaleTimeString" => locale_time(&f, &Opts::new(opts, heap), true),
        "toLocaleString" => {
            let o = Opts::new(opts, heap);
            match (o.has_date(), o.has_time()) {
                (true, false) => locale_date(&f, &o, false),
                (false, true) => locale_time(&f, &o, false),
                (true, true) => format!(
                    "{}, {}",
                    locale_date(&f, &o, false),
                    locale_time(&f, &o, false)
                ),
                (false, false) => format!(
                    "{}, {}",
                    locale_date(&f, &o, true),
                    locale_time(&f, &o, true)
                ),
            }
        }
        _ => return None,
    })
}

/// The subset of `Intl.DateTimeFormat` options that shape en-US output.
struct Opts {
    weekday: Option<String>,
    year: Option<String>,
    month: Option<String>,
    day: Option<String>,
    hour: Option<String>,
    minute: Option<String>,
    second: Option<String>,
    hour12: bool,
    date_style: Option<String>,
    time_style: Option<String>,
}

impl Opts {
    fn new(map: Option<&IndexMap<Arc<str>, Value>>, heap: &Heap) -> Self {
        let get = |k: &str| {
            map.and_then(|m| m.get(k))
                .filter(|v| !matches!(v, Value::Undefined))
                .map(|v| v.to_js_string(heap))
        };
        Self {
            weekday: get("weekday"),
            year: get("year"),
            month: get("month"),
            day: get("day"),
            hour: get("hour"),
            minute: get("minute"),
            second: get("second"),
            hour12: !matches!(map.and_then(|m| m.get("hour12")), Some(Value::Bool(false))),
            date_style: get("dateStyle"),
            time_style: get("timeStyle"),
        }
    }
    fn has_date(&self) -> bool {
        self.weekday.is_some()
            || self.year.is_some()
            || self.month.is_some()
            || self.day.is_some()
            || self.date_style.is_some()
    }
    fn has_time(&self) -> bool {
        self.hour.is_some()
            || self.minute.is_some()
            || self.second.is_some()
            || self.time_style.is_some()
    }
}

fn locale_date(f: &Fields, o: &Opts, default_all: bool) -> String {
    let (weekday, year, month, day) = match o.date_style.as_deref() {
        Some("full") => (Some("long"), Some("numeric"), Some("long"), Some("numeric")),
        Some("long") => (None, Some("numeric"), Some("long"), Some("numeric")),
        Some("medium") => (None, Some("numeric"), Some("short"), Some("numeric")),
        Some(_) => (None, Some("2-digit"), Some("numeric"), Some("numeric")),
        None if default_all && !o.has_date() => {
            (None, Some("numeric"), Some("numeric"), Some("numeric"))
        }
        None => (
            o.weekday.as_deref(),
            o.year.as_deref(),
            o.month.as_deref(),
            o.day.as_deref(),
        ),
    };
    let weekday = weekday.map(|w| {
        if w == "long" {
            DAYS[f.dow].to_string()
        } else {
            DAYS[f.dow][..3].to_string()
        }
    });
    let year = year.map(|y| {
        if y == "2-digit" {
            format!("{:02}", f.year.rem_euclid(100))
        } else {
            f.year.to_string()
        }
    });
    let day = day.map(|d| {
        if d == "2-digit" {
            format!("{:02}", f.day)
        } else {
            f.day.to_string()
        }
    });
    let text_month = matches!(month, Some("long" | "short" | "narrow"));
    let body = if text_month {
        let name = MONTHS[f.month - 1];
        let m = match month {
            Some("long") => name.to_string(),
            Some("short") => name[..3].to_string(),
            _ => name[..1].to_string(),
        };
        match (day, year) {
            (Some(d), Some(y)) => format!("{m} {d}, {y}"),
            (Some(d), None) => format!("{m} {d}"),
            (None, Some(y)) => format!("{m} {y}"),
            (None, None) => m,
        }
    } else {
        let m = month.map(|m| {
            if m == "2-digit" {
                format!("{:02}", f.month)
            } else {
                f.month.to_string()
            }
        });
        [m, day, year]
            .into_iter()
            .flatten()
            .collect::<Vec<_>>()
            .join("/")
    };
    match (weekday, body.is_empty()) {
        (Some(w), true) => w,
        (Some(w), false) => format!("{w}, {body}"),
        (None, _) => body,
    }
}

fn locale_time(f: &Fields, o: &Opts, default_all: bool) -> String {
    let (hour, minute, second) = match o.time_style.as_deref() {
        Some("short") => (Some("numeric"), Some("2-digit"), None),
        Some(_) => (Some("numeric"), Some("2-digit"), Some("2-digit")),
        None if default_all && !o.has_time() => (Some("numeric"), Some("2-digit"), Some("2-digit")),
        None => (o.hour.as_deref(), o.minute.as_deref(), o.second.as_deref()),
    };
    let (h, suffix) = if o.hour12 {
        let h12 = if f.hour % 12 == 0 { 12 } else { f.hour % 12 };
        (h12, Some(if f.hour < 12 { "AM" } else { "PM" }))
    } else {
        (f.hour, None)
    };
    let mut parts = Vec::new();
    if let Some(hs) = hour {
        parts.push(if hs == "2-digit" || !o.hour12 {
            format!("{h:02}")
        } else {
            h.to_string()
        });
    }
    if minute.is_some() {
        parts.push(format!("{:02}", f.minute));
    }
    if second.is_some() {
        parts.push(format!("{:02}", f.second));
    }
    let mut out = parts.join(":");
    if let (Some(s), true) = (suffix, hour.is_some()) {
        out.push(' ');
        out.push_str(s);
    }
    out
}

/// `Date.prototype.toString` (what `String(date)` and `${date}` produce).
pub(crate) fn date_to_string(millis: i64) -> String {
    let f = fields(millis);
    format!(
        "{} {} {:02} {:04} {:02}:{:02}:{:02} GMT+0000 (Coordinated Universal Time)",
        &DAYS[f.dow][..3],
        &MONTHS[f.month - 1][..3],
        f.day,
        f.year,
        f.hour,
        f.minute,
        f.second
    )
}
