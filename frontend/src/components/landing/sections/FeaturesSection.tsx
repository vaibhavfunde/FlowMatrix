
import { CheckCircle, Users, Bell, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
    {
        icon: CheckCircle,
        title: "Task Tracking",
        description: "Keep track of all your tasks with intuitive boards and lists that make project management effortless."
    },
    {
        icon: Users,
        title: "Team Collaboration", 
        description: "Work together seamlessly with real-time updates, comments, and file sharing across your team."
    },
    {
        icon: Bell,
        title: "Deadline Reminders",
        description: "Never miss important deadlines with smart notifications and automated reminder systems."
    },
    {
        icon: BarChart3,
        title: "Progress Dashboard",
        description: "Visualize your team's progress with comprehensive analytics and customizable reporting tools."
    }
];

export const FeaturesSection = () => {
    return (
        <section id="features" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Everything you need to manage projects
                    </h2>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        Powerful features designed to help your team collaborate better and deliver results faster.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-gray-200 hover:border-blue-200">
                            <CardContent className="p-6">
                                <div className="mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <feature.icon className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-700">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
