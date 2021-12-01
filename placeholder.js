function sendDataToFirebase(data)
{
  //socket.emit('text', edit)
  set(dataRef, {edit: data});
}