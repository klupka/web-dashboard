import React from "react";
import { Calendar } from "@heroui/react";
import { Card } from "@heroui/react";

const CurrentCalendar = () => {
    const months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December",
    };

    const currentDate = new Date();

    const currentMonth = months[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    return (
        <Card className="flex justify-center items-center aspect-square w-[300px] glass-card">
            <Calendar aria-label="Event date" className="border-none">
                <Calendar.Header>
                    <div className="flex justify-between items-center w-full">
                        <p className="">{currentMonth}</p>
                        <p className="">{currentYear}</p>
                    </div>

                    {/* <Calendar.Heading /> */}
                    {/* <Calendar.NavButton slot="previous" />
                            <Calendar.NavButton slot="next" /> */}
                </Calendar.Header>
                <Calendar.Grid>
                    <Calendar.GridHeader>
                        {(day) => (
                            <Calendar.HeaderCell>{day}</Calendar.HeaderCell>
                        )}
                    </Calendar.GridHeader>
                    <Calendar.GridBody>
                        {(date) => <Calendar.Cell date={date} />}
                    </Calendar.GridBody>
                </Calendar.Grid>
            </Calendar>
        </Card>
    );
};

export default CurrentCalendar;
