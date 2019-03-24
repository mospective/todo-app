//object

var todoList = {

    todos: [],
    addTodo: function(todoText) {
        this.todos.push({
            todoText:todoText,
            completed: false
        });
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function() {
        var completeTodos = 0; // initial is 0 for number of completed todos
        //number of item that has completed set to true
        this.todos.forEach(function(i) {
            if (i.completed === true){ //
                completeTodos++;
            }
        });
        this.todos.forEach(function(i){
            if (completeTodos === totalTodos) {
                i.completed = false;
            } else {
                i.completed = true; 
            }
        });
    }
};

//refactoring code from v7.js

// update this area

var handlers = {

    addTodo: function() {
       // debugger;

        var addTodoText = document.getElementById('inputBox');

        addTodoText.addEventListener('keydown', function(e){
            if (event.keyCode === 13) {
                console.log(e);
                event.preventDefault();
                todoList.addTodo(addTodoText.value);
                console.log(addTodoText.value);
                addTodoText.value = '';
                
               view.displayTodos();
            } 
        });



       
        
    },
    changeTodo: function() {
        var inputPosition = document.getElementById('changeTodoInputPosition');
        var inputNewValue = document.getElementById('valueNew');
        todoList.changeTodo(inputPosition.valueAsNumber, inputNewValue.value);
        inputPosition.value = '';
        inputNewValue.value = '';
        view.displayTodos();
    },
    deleteTodo: function(position){
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted: function() {
        var getNum = document.getElementById('toggleCompletedNum');
        todoList.toggleCompleted(getNum.valueAsNumber);
        getNum.value = '';
        view.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    }
    

};

// View todos in the dom

var view = {

    // update this area
    displayTodos: function() {
       // debugger;
        var todoUl = document.querySelector('ul.listItems');
        todoUl.innerHTML = '';
            
        for (var i = 0; i < todoList.todos.length; i++) {
           var todoLi = document.createElement('li');
           var todoItem = document.createElement('div');
           var todoConfig = document.createElement('div');
           var td = todoList.todos[i];
           var todoText = td.todoText;
           todoConfig.className = 'config';
           todoItem.className = 'item';
           todoItem.textContent = todoText;

           var toggleBtn = document.createElement('button');
           var  todoCompleted = '';

    
                if (td.completed === true) {
                   
                    toggleBtn.className = 'toggled';
                    //todoCompleted = '(X) ' + todoText;
                } else {
                    
                    toggleBtn.className = 'toggled-not';
                    //todoCompleted = '( ) ' + todoText;
                }

           todoLi.appendChild(todoItem);
           todoConfig.appendChild(toggleBtn);
           todoLi.appendChild(todoConfig);
           todoUl.appendChild(todoLi);
        }

            // todosList.todos.forEach(function(l, position){
            //     var todoLi = document.createElement('li');
            //     // var todoText = l.todoText;
            //     // var  todoCompleted = '';
    
            //     // if (l.completed === true) {
            //     //     todoCompleted = '(X) ' + todoText;
            //     // } else {
            //     //     todoCompleted = '( ) ' + todoText;
            //     // }
            //     // todoLi.id = position;
            //     // todoLi.textContent = todoCompleted;
            //     // todoLi.appendChild(this.createDeleteButton());
            //     todoUl.appendChild(todoLi);
                
            // }, this);
    },

    // Update this area
    createDeleteButton: function() {
        var btn =  document.createElement('button');
        btn.className = 'deleteBtn';
        btn.textContent = 'Delete';
        return btn;
    },
    setupEventListener: function() {
            var todoUl = document.querySelector('ul');

            todoUl.addEventListener('click', function(event){
                elementClicked = event.target;

                if (elementClicked.className === 'deleteBtn') {
                    handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
                }
            }, false);
    }

};

view.setupEventListener();
handlers.addTodo();

