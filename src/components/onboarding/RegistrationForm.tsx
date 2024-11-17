import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registrationFormSchema = z.object({
    name: z.string().min(1),
    username: z.string().min(1),
    email: z.string().email(),
});

export default function RegistrationForm({ formDefaults }: { formDefaults?: { name?: string; username?: string; email?: string; }; }) {

    const form = useForm<z.infer<typeof registrationFormSchema>>({
        resolver: zodResolver(registrationFormSchema),
        defaultValues: formDefaults,
    });

    async function onSubmit(data: z.infer<typeof registrationFormSchema>) {
        console.log(data);
    }

    return (
        <div>
            <h2 className="text-4xl font-bold p-2">Register</h2>
            <div className="flex flex-col gap-4 rounded-md border p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" />
                        </div>
                        <Button type="submit">Register</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
