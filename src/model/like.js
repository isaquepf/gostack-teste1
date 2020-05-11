 class Like { 
  
  static getLikes()
  {
    return this.count || 0;
  }

  static liked(count) {
    return count = count + 1;
  }

  static dislike(count) {
    return this.count--;
  }
}
module.exports = Like;
