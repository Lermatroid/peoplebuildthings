'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Pomodoro({ workTime = 25, breakTime = 5 }) {
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
    }, [isActive, time, isWork]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setIsWork(true);
        setTime(workTime * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = isWork
        ? ((workTime * 60 - time) / (workTime * 60)) * 100
        : ((breakTime * 60 - time) / (breakTime * 60)) * 100;

    return (
        <div className={`flex w-fit items-center p-2 rounded-lg border mx-auto ${isWork ? 'bg-green-100' : 'bg-red-100'}`}>
            {/* <Progress value={progress} className="w-24 h-2" /> */}
            <div className="text-center font-mono font-bold text-9xl text-align-middle">{formatTime(time)}</div>
            <div className="flex flex-col">
                <Button
                    // size="icon"
                    variant="ghost"
                    onClick={toggleTimer}
                    className="h-12 w-12"
                    aria-label={isActive ? 'Pause' : 'Start'}
                >
                    {isActive ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
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