const tagCategories = [
    'pink',
    'red',
    'orange',
    'green',
    'cyan',
    'yellow',
    'coral',
    'lime',
    'silver',
    'teal',
    'darkgreen',
    'olive',
    'gray',
    'cadetblue',
  ]
  
  export default {
    randomColor: () => tagCategories[Math.floor(Math.random() * (tagCategories.length + 1))]
  }