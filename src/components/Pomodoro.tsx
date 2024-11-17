"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, PencilRuler, Armchair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";

export default function Pomodoro({ defaultWorkTime = 25, defaultBreakTime = 5 }) {
    const [workTime, setWorkTime] = useState(defaultWorkTime);
    const [breakTime, setBreakTime] = useState(defaultBreakTime);
    const [time, setTime] = useState(workTime * 60);
    const [isActive, setIsActive] = useState(false);
    const [isWork, setIsWork] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (time === 0) {
            setIsWork((prev) => !prev);
            setTime(isWork ? breakTime * 60 : workTime * 60);
            setIsActive(true);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, time, isWork, workTime, breakTime]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setIsWork(true);
        setTime(workTime * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const progress = isWork
        ? ((workTime * 60 - time) / (workTime * 60)) * 100
        : ((breakTime * 60 - time) / (breakTime * 60)) * 100;

    return (
        <div
            className={`mx-auto flex w-fit items-center rounded-lg border p-2 ${isWork ? "bg-green-200" : "bg-red-200"}`}
        >
            {/* <Progress value={progress} className="w-24 h-2" /> */}
            <div>
                <div className="flex justify-around gap-x-4">
                    <div className="flex items-center gap-2"><PencilRuler /><Input type="text" className="w-16" value={workTime.toString()} onChange={(e) => setWorkTime(Number(e.target.value))} /></div>
                    <div className="flex items-center gap-2"><Armchair /><Input type="text" className="w-16" value={breakTime.toString()} onChange={(e) => setBreakTime(Number(e.target.value))} /></div>
                </div>
                <div className="text-align-middle text-center font-mono text-9xl font-bold">
                    {formatTime(time)}
                </div>
            </div>
            <div className="flex flex-col">
                <Button
                    // size="icon"
                    variant="ghost"
                    onClick={toggleTimer}
                    className="h-12 w-12"
                    aria-label={isActive ? "Pause" : "Start"}
                >
                    {isActive ? (
                        <Pause className="h-8 w-8" />
                    ) : (
                        <Play className="h-8 w-8" />
                    )}
                </Button>
                <Button
                    // size="icon"
                    variant="ghost"
                    onClick={resetTimer}
                    className="h-12 w-12"
                    aria-label="Reset"
                >
                    <RotateCcw className="h-8 w-8" />
                </Button>
            </div>
        </div>
    );
}
