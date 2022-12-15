class TsDefinitions
{
    public readonly List<string> Modules = new List<string>();

    public TsDefinitions(string filename)
    {
        var data = File.ReadAllText(filename);

        foreach (var line in data.Split("\n"))
        {
            var i = line.IndexOf("declare module");
            
            if (i != -1)
            {
                var a = line.IndexOf('"', i + 1) + 1;
                var b = line.IndexOf('"', a);

                if (a != 0 && b != -1)
                {
                    var module = line.Substring(a, b - a);
                    Modules.Add(module);
                }
            }
        }
    }
}
