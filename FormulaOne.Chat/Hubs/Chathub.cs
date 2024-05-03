using FormulaOne.Chat.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using FormulaOne.Chat.Models;


public class ChatHub : Hub
{
    private readonly SharedDb _shared;

    public ChatHub(SharedDb shared)
    {
        _shared = shared;
    }

    public async Task JoinSpecificChatRoom(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);

        // Update the Connections map with the new user's information.
        _shared.Connections[Context.ConnectionId] = conn;

        // Broadcast to the group that a user has joined.
        // The second parameter should be `conn.Username` to reflect the user who is joining.
        await Clients.Group(conn.ChatRoom).SendAsync("JoinSpecificChatRoom", conn.Username, $"{conn.Username} has joined {conn.ChatRoom}");
    }

    public async Task SendMessage(string msg)
    {
        if (_shared.Connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
        {
            // When sending a message, use the username from the connection map.
            await Clients.Group(conn.ChatRoom).SendAsync("ReceiveSpecificMessage", conn.Username, msg);
        }
    }
}
