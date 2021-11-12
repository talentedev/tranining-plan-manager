<template>
  <div class="d-flex m-5 mt-0">
    <div class="session-plan">
      <div class="d-flex justify-content-between">
        <p class="m-0">My traning plan</p>
        <p class="m-0 cursor-pointer" @click="clearPlan">Clear plan</p>
      </div>
      <div class="wrapper">
        <draggable v-model="planSessions" v-bind="dragOptions" class="list-group" tag="ul" @start="isDragging=true" @end="isDragging=false" :move="onMove">
          <transition-group type="transition" :name="'flip-list'">
            <li class="list-group-item" v-for="element in planSessions" :key="element.priority">
              <div class="d-flex justify-content-between">
                <div class="d-flex justify-content-start">
                  <b-icon-list></b-icon-list>
                  <div>
                    <p class="m-0">{{element.title}}</p>
                    <p class="m-0">{{element.description}}</p>
                  </div>
                </div>
                <div class="d-flex justify-content-end controls">
                  <b-icon-check2-circle :style="{'background-color': element.completed? 'green': '#c5acac'}" @click="markAsCompleted(element)"></b-icon-check2-circle>
                  <b-icon-trash @click="moveToBank(element)"></b-icon-trash>
                </div>
              </div>
            </li>
          </transition-group>
        </draggable>
      </div>
    </div>
    <div class="session-bank">
      <p class="m-0">Traning sessions bank</p>
      <div class="wrapper">
        <draggable v-model="bankSessions" v-bind="dragOptions" element="span" :move="onMove">
          <transition-group name="no" class="list-group" tag="ul">
            <li class="list-group-item" v-for="element in bankSessions" :key="element._id">
              <div class="d-flex justify-content-between">
                <div class="d-flex justify-content-start">
                  <b-icon-list></b-icon-list>
                  <div>
                    <p class="m-0">{{element.title}}</p>
                    <p class="m-0">{{element.description}}</p>
                  </div>
                </div>
                <div class="d-flex justify-content-end controls">
                  <b-icon-plus @click="moveToPlan(element)"></b-icon-plus>
                  <b-icon-trash @click="deleteSession(element)"></b-icon-trash>
                </div>
              </div>
            </li>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'Sessions',
  components: {
    draggable 
  },
  data() {
    return {
      value: '',
      values: [],
      error: false,
      selectedValue: {},
      errorUpdate: false,
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  mounted () {
    this.getSessions();
  },
  methods: {
    getSessions() {
      const userId = this.$store.getters['security/userId'];
      this.$store.dispatch('session/getSessions', userId);
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    clearPlan() {
      this.$store.dispatch('session/clearPlan');
    },
    moveToPlan(session) {
      this.$store.dispatch('session/moveToPlan', session);
    },
    moveToBank(session) {
      this.$store.dispatch('session/moveToBank', session);
    },
    markAsCompleted(session) {
      this.$store.dispatch('session/markAsCompleted', session);
    },
    deleteSession(session) {
      this.$store.dispatch('session/delete', session);
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
    planSessions: {
      get() {
        return this.$store.getters['session/planSessions'];
      },
      set(value) {
        this.$store.dispatch('session/setPlanSession', value)
      }
    },
    bankSessions: {
      get() {
        return this.$store.getters['session/bankSessions'];
      },
      set(value) {
        this.$store.dispatch('session/setBankSession', value)
      }
    }
  }
}
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  background-color: #ddd;
  padding: 0px 5px;
  cursor: move;
  margin: 5px;
}
.list-group-item i {
  cursor: pointer;
}
</style>