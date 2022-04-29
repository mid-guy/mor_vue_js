<script>
  export default {
    props: {
      place: { 
        type: String, 
        default: 'Type here'
      },
      value: String,
      name: String,
      type: {
        type: String,
        default: 'text'
      }
    },
    data() {
      return {
        test: false,
      }
    },
    methods: {
      onChange(e) {
        this.$emit('onChange', { name: this.name, value: e.target.value } )
      },
      onFocusInput() {
        this.test = true;
      },
      onFocusOutInput() {
        this.test = false;
      }
    } 
  }
</script>
<template>
  <div class='root-textfield__outlined' id="outlined">
    <input 
      class='__input'
      :value="value"
      :type="type"
      placeholder=" "
      @input="onChange"
    />
    <label 
      className='label' 
      :htmlFor="place" 
    >
      {{ place }}
    </label>
  </div>
</template>

<style scoped>
  #outlined.root-textfield__outlined {
  position: relative;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 14px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 10px 16px;
  height: 43px;
  border-radius: 5px;
  /* background-color: rgb(199, 199, 199); */
  background-color: inherit;
  border: 2px solid #282c34;
  box-sizing: border-box;
  pointer-events: none;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}

#outlined.root-textfield__outlined.input__onFocus {
  border-color: red;
}

#outlined.root-textfield__outlined:hover {
  border-color: red;
}

.__input:focus ~ .label, .__input:not(:placeholder-shown).__input:not(:focus) ~ .label {
  -webkit-transform: translate(-4px, -21px) scale(0.75);
  transform: translate(-4px, -21px) scale(0.75);
}

.__input:focus + .root-textfield__outlined {
  border-color: red;
}

.__input {
  outline: none;
  border: none;
  background: none;
  font-family: inherit;
  font-size: inherit;
  color: #282c34;
  padding: 0;
  width: 100%;
  pointer-events: auto;
}

.label {
  font-family: inherit;
  position: absolute;
  font-size: inherit;
  padding: 0 4px;
  cursor: text;
  color: #282c34;
  /* background-color: rgb(199, 199, 199); */
  background-color: inherit;
  overflow: hidden;
  -webkit-transform-origin: center left;
  transform-origin: center left;
  -webkit-transform: translate(-4px, 0px) scale(1);
  transform: translate(-4px, 0px) scale(1);
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  pointer-events: none;
}
</style>