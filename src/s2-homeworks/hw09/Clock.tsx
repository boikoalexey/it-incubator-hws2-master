import React, { useState, useEffect } from "react";
import SuperButton from "../hw04/common/c2-SuperButton/SuperButton";
import { restoreState } from "../hw06/localStorage/localStorage";
import s from "./Clock.module.css";

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined);
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(
        new Date(restoreState("hw9-date", Date.now()))
    );
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {

        return () => {
            clearInterval(timerId);
        };
    }, []);

    const start = () => {
        // Clear the previous interval if it exists
        clearInterval(timerId);

        // Start the clock by setting a new interval
        const intervalId = setInterval(() => {
            setDate(new Date());
        }, 1000);

        setTimerId(intervalId as unknown as number);
    };

    const stop = () => {
        // Stop the clock by clearing the interval and resetting timerId
        clearInterval(timerId);
        setTimerId(undefined);
    };

    const onMouseEnter = () => {
        // показать дату если наведена мышка
        setShow(true);
    };
    const onMouseLeave = () => {
        // спрятать дату если мышка не наведена
        setShow(false);
    };

    const formatterTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
    });
    const formatterDate = new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).formatToParts();

    const stringTime = formatterTime.format(date); // часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01)
    // const stringDate = formatterDate.format(date); // день.месяц.год (01. February 2022)
    const stringDate = `${formatterDate[2].value}.${formatterDate[0].value}.${formatterDate[4].value}`; // день.месяц.год (17.05.2023)


    // день недели на английском, месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat)
    const formatterDay = new Intl.DateTimeFormat("en-US", { weekday: "long" });
    const formatterMonth = new Intl.DateTimeFormat("en-US", { month: "long" });

    const stringDay = formatterDay.format(date); // пишут студенты
    const stringMonth = formatterMonth.format(date); // пишут студенты

    return (
        <div className={s.clock}>
            <div
                id={"hw9-watch"}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={"hw9-day"}>{stringDay}</span>,{" "}
                <span id={"hw9-time"}>
          <strong>{stringTime}</strong>
        </span>
            </div>

            <div id={"hw9-more"}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={"hw9-month"}>{stringMonth}</span>,{" "}
                            <span id={"hw9-date"}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br />
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={"hw9-button-start"}
                    disabled={timerId !== undefined} // задизэйблить если таймер запущен
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={"hw9-button-stop"}
                    disabled={timerId === undefined} // задизэйблить если таймер не запущен
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    );
}

export default Clock;
