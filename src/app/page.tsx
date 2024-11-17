import Pomodoro from "@/components/Pomodoro";

export default function HomePage() {
    return (
        <div>
            <Pomodoro defaultWorkTime={0.5} defaultBreakTime={0.1} />
        </div>
    );
}
