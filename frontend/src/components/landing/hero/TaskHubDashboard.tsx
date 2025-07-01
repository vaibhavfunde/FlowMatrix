
export const TaskHubDashboard = () => {
    return (
        <div className="relative space-y-3 rounded-[1rem] bg-white/5 p-4">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Project Dashboard</h3>
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
            </div>
            
            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm font-medium">Website Redesign</span>
                    </div>
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">In Progress</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-sm font-medium">API Integration</span>
                    </div>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Completed</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                        <span className="text-sm font-medium">User Testing</span>
                    </div>
                    <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">Pending</span>
                </div>
            </div>
            
            <div className="mt-6 h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: '68%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">68% Complete</p>
        </div>
    )
}
