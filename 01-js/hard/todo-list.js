/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor(){
    this.todos = []
  }
  // - add(todo): adds todo to list of todos
  add(data){
    this.todos.push(data)
  }
  // - remove(indexOfTodo): remove todo from list of todos
  remove(index){
    this.todos = this.todos.filter((t,i) => {
      if (i !== index) return t
    })
  }
  // - update(index, updatedTodo): update todo at given index
  update(index, updatedTodo){
    this.todos[index] = updatedTodo
  }
  // - getAll: returns all todos
  getAll(){
    return this.todos
  }
  // - get(indexOfTodo): returns todo at given index
  get(indexOfTodo){
    return this.todos[indexOfTodo]
  }
  // - clear: deletes all todos
  clear(){
    this.todos = []
  }
}

module.exports = Todo;
