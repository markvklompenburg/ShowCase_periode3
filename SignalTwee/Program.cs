using SignalRChat.Hubs;

var builder = WebApplication.CreateBuilder(args);


var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy(name: MyAllowSpecificOrigins,
//        policy =>
//        {
//            policy.WithOrigins("http://localhost:63342/SignalRtryout/").AllowAnyHeader().AllowAnyMethod();
//        });
//});


// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddSignalR();
builder.Services.AddCors();


var app = builder.Build();

app.UseCors(builder =>
{
    builder.WithOrigins("http://localhost:63342")
        .AllowAnyHeader()
        .WithMethods("GET", "POST")
        .AllowCredentials();
});

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<ChatHub>("/chathub");
});

app.UseAuthorization();

app.MapRazorPages();
//app.MapHub<ChatHub>("/chatHub");

app.Run();

