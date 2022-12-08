export interface CardTodo {
    id : number,
    status : "BACKLOG"|"INPROGRESS"|"DONE",
    title : string ,
    content : string
    estimate : string,
    assign : number,
    createdAt : string,
    priority : 1|2|3
  }
export interface CardAssign extends CardTodo {
    userIds : number[]|string[]
}