const Like = require('../model/like')
 class Repository {
  constructor(id, title, url, techs) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.techs = techs;
    this.likes = 0;
  }

  liked() {
      this.likes = Like.liked(this.likes);
  }
}

module.exports = Repository;

