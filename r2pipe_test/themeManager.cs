﻿using System;

namespace r2pipe_test
{
    class themeManager
    {
        public string themeName = null;
        private RConfig config = null;
        public themeManager(RConfig config)
        {
            this.config = config;
            string themeName = config.load<string>("gui.theme_name");
            if( themeName != null )
               set_theme(themeName);
        }
        public void set_theme(string themeName)
        {
            this.themeName = themeName;
            config.save("gui.theme_name", themeName);
            config.save("gui.hexview.css", string.Format("hexview.{0}.css", themeName));
            switch (themeName)
            {
                case "classic":
                    config.save("gui.output.bg", "white");
                    config.save("gui.output.fg", "black");
                    config.save("gui.hexview.css", "r2pipe.css");
                    break;
                case "azure":
                    config.save("gui.output.bg", "Azure");
                    config.save("gui.output.fg", "DarkSlateGray");
                    break;
                case "pink":
                    config.save("gui.output.bg", "indigo");
                    config.save("gui.output.fg", "white");
                    break;
                case "control":
                    config.save("gui.output.bg", "Control");
                    config.save("gui.output.fg", "ControlText");
                    break;
                case "terminal256":
                    config.save("gui.output.bg", "black");
                    config.save("gui.output.fg", "Aquamarine");
                    break;
                case "lemon":
                    config.save("gui.output.bg", "Khaki");
                    config.save("gui.output.fg", "black");
                    break;
            }
            Console.WriteLine("set_theme: {0}", themeName);
        }
    }
}
