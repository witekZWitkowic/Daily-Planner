window.addEventListener('load', () => {
    const addTaskBtn = document.querySelector('#btn-add-task');
    const tasksContainer = document.querySelector("#tasksContainer");
    const newTaskInput = document.querySelector('#newTaskInput');
    const task = document.querySelectorAll('.task-boxes');

    const randomTasks = ['Walk out the kitten', 'Eat bananas', 'Check Pipi Pupu', 'Massage your chickens', 'Play Fifa',
        'Spin the spinner', 'Play Heroes 3 with Necro', 'Make some cookies', 'Go shopping', 'Code ToDo List', 'Make pancakes',
        'Eat some chocolate', 'Make the bed', 'Meeting with Witek', 'Read The Witcher'];

    //This function removes task with fade-out effect.
    function removeFadeOut(el,speed) {
        const seconds = speed/1000;
        el.style.transition = "opacity "+seconds+"s ease";
        el.style.opacity = 0;
        setTimeout(function() {
            el.parentNode.removeChild(el);
        }, speed);
    }

    addTaskBtn.addEventListener('click', function () {
        //Creating new task in the list.
        const newTask_container = document.createElement('div');
        newTask_container.classList.add('task-boxes');

        //Creating new task's content
        const content = document.createElement('div');
        content.classList.add('content');
        newTask_container.append(content);

        //Giving new task's value
        const taskValue = document.createElement('input');
        taskValue.classList.add('task-content');
        taskValue.type = 'text';
        taskValue.value = newTaskInput.value;
        taskValue.setAttribute('readonly', 'readonly');
        if (newTaskInput.value === '') {
            const randomTask = Math.floor(Math.random() * randomTasks.length);
            return newTaskInput.value = randomTasks[randomTask];
        }
        content.append(taskValue);

        //Creating holder for edit and delete
        const editDeleteHolder = document.createElement('div');
        editDeleteHolder.classList.add('edit-delete');
        newTask_container.append(editDeleteHolder);

        //Creating buttons, edit and Delete
        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.classList.add('btn-edit');
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('btn-delete');

        editDeleteHolder.append(editBtn, deleteBtn);
        tasksContainer.append(newTask_container);
        newTaskInput.value = '';
        //Edit Task
        editBtn.addEventListener('click', () =>{
            if(editBtn.innerText.toLowerCase() === 'edit') {
                editBtn.innerText = 'Save';
                taskValue.removeAttribute('readonly');
                taskValue.classList.add('focused');
                taskValue.focus();
            } else {
                editBtn.innerText = 'Edit'
                taskValue.setAttribute('readonly', 'readonly');
                taskValue.classList.remove('focused');
            }
        });

        //Delete Task
        deleteBtn.addEventListener('click', function(){
            removeFadeOut(newTask_container, 500 );
        });

        //Set task to "Done".
        content.addEventListener('click', () =>{
            if(editBtn.innerText === 'Edit' || editBtn.innerText === 'Done') {
                newTask_container.classList.toggle('completed');
                if (newTask_container.classList.contains('completed')) {
                    taskValue.style.textDecoration = 'line-through';
                    editBtn.innerText = "Done";
                    editBtn.disabled = true;
                } else {
                    editBtn.disabled = false;
                    editBtn.innerText = "Edit";
                    taskValue.style.textDecoration = 'none';
                }
            }
        });
    });
});