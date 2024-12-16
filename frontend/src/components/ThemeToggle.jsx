import React, { useEffect } from 'react'
import ReactSwitch from 'react-switch'

const ThemeToggle = ({ theme, setTheme }) => {
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) setTheme(savedTheme);
        else localStorage.setItem('theme', 'dark');
    }, []);

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            localStorage.setItem('theme', prevTheme === 'dark' ? 'light' : 'dark');
            return prevTheme === 'dark' ? 'light' : 'dark';
        });
    };

    return (
        <ReactSwitch
            checked={theme === "dark"}
            onChange={toggleTheme}
            offColor="#B0B0B0"
            onColor="#4CAF50"
            offHandleColor="#FFFFFF"
            onHandleColor="#FFFFFF"
            height={30}
            width={60}
            uncheckedIcon={false}
            checkedIcon={false}
            className="transition duration-300 ease-in-out mb-6 absolute top-0 right-0 m-6"
        />
    )
}

export default ThemeToggle
