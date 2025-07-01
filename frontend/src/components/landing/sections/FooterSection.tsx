
import { Twitter, Linkedin, Github } from "lucide-react";

export const FooterSection = () => {
    return (
        <footer className="bg-white border-t border-gray-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold text-blue-600 mb-4">TaskHub</h3>
                        <p className="text-gray-700 mb-6">
                            The modern project management tool that helps teams stay organized and deliver exceptional results.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                                <Twitter className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                                <Linkedin className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                                <Github className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a></li>
                            <li><a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a></li>
                            <li><a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Documentation</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-200 mt-8 pt-8 text-center">
                    <p className="text-gray-600">
                        © 2024 TaskHub. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
