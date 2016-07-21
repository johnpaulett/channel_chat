import calendar


def timestamp(dt):
    return int(calendar.timegm(dt.timetuple()))
