var app = new Vue({
  el: '#app',
  data: {
    number: '',
    max: '',
    current: {},
    loading: true,
    addedName: '',
    addedComment: '',
    addedTime:'',
    comments: {},
    stars: {},
    rating: 0,
    averageRating: '',
  },
  created: function() {
    this.xkcd();
  },
  methods: {
    xkcd: function() {
      this.loading = true;
      fetch('https://rickandmortyapi.com/api/character/'+this.getRandom(1,394)).then(response => {
        return response.json();
      }).then(json => {
        this.current = json;
        this.loading = false;
        this.number = json.num;
        return true;
      }).catch(err => {
        this.number = this.max;
      });
    },
    previousComic: function() {
      this.number = this.current.num - 1;
    },
    nextComic: function() {
      this.number = this.current.num + 1;
    },
    getRandom: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor((Math.random() * max) + 1);//The maximum and minimum are inclusive 
    },
    random: function() {
      this.number = this.xkcd();
    },

  }, 
  watch: {
    number: function(value,oldvalue) {
      if (oldvalue === '') {
        this.max = value;
      } else {
        this.xkcd();
      }
    },
  },
});


var app1 = new Vue({
  el: '#app1',
  data: {
    number1: 1,
    current1: {},
    loading1: false,
  },
  created: function() {
    this.xkcd();
  },
  methods: {
    xkcd: function() {
      this.loading1 = true;
      fetch('https://rickandmortyapi.com/api/character?page=' + this.number1).then(response => {
        return response.json();
      }).then(json => {
        this.current1 = json.results;
        console.log(this.current1);
        this.loading1 = false;
      });
    }, 
    previous: function() {
      this.number1 -= 1;
    },
    next: function() {
      this.number1 += 1;
    },
  },   
  watch: {
    number1: function(value,oldvalue) {
      if (this.number1 === 21) {
        this.number1 = 20;
        console.log('20');
      } else if (this.number1 === 0) {
        this.number1 = 1;
        console.log('1');
      } else {
        this.xkcd();
        console.log('hihi');
      }
    },
  },
});