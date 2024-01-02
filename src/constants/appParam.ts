const AppParam = {
    VITE_PORT: import.meta.env.VITE_PORT,
    VITE_PUBLIC_FOLDER: import.meta.env.VITE_PUBLIC_FOLDER,
    VITE_LOGS_FOLDER: import.meta.env.VITE_LOGS_FOLDER,
    VITE_LIMIT_REQUEST: import.meta.env.VITE_LIMIT_REQUEST,
    VITE_PATH_PROMETHEUS_METRICS: import.meta.env.VITE_PATH_PROMETHEUS_METRICS,
};

export default AppParam;