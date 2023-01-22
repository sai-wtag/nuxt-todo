<template>
  <div>
    <div class="add-todo-card">
      <div class="add-todo-card__body">
        <!-- <input
          type="text"
          class="add-todo-card__input"
          placeholder="Add todo"
        /> -->
        <textarea class="add-todo-card__input" placeholder="Add Task" />
      </div>
      <div class="add-todo-card__footer">
        <button class="add-todo-card__footer__btn">Add Task</button>
        <button>Delete</button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
$card-padding: 10px;
.add-todo-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: $card-padding;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.add-todo-card__footer {
  display: flex;
  align-items: center;
  gap: 10px 10px;
}

.add-todo-card__input {
  resize: none;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
  width: calc(100% - $card-padding);
  height: 100px;
}
</style>
