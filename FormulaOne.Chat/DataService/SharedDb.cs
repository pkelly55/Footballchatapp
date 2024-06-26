using System.Collections.Concurrent;
using FormulaOne.Chat.Models;

public class SharedDb
{
    private readonly ConcurrentDictionary<string, UserConnection> _connections = new ConcurrentDictionary<string, UserConnection>();

    public ConcurrentDictionary<string, UserConnection> Connections => _connections;
}
