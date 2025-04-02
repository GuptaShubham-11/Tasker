import { AddTask, TaskList } from "../components";

export default function Tasks() {
    return (
        <div className="min-h-screen p-6 bg-bgLight dark:bg-bgDark text-txtLight dark:text-txtDark">
            <div className="max-w-lg mx-auto mt-6">
                <AddTask />
                <TaskList />
            </div>
        </div>
    );
}