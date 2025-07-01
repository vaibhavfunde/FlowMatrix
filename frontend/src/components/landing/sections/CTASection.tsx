
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
    return (
        <section className="py-20 bg-blue-600">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">
                    Start your team's productivity journey with TaskHub today
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                    Join thousands of teams who trust TaskHub to manage their projects and boost productivity.
                </p>
                <Button className="bg-white text-blue-600 shadow-sm hover:bg-gray-50 transition-colors text-lg px-8 py-3">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </section>
    );
};
