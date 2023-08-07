export class GetArticles {
  static readonly type = '[Homepage] get all articles';
  constructor(public payload?: string) {}
}

export class GetArticleById {
  static readonly type = '[Homepage] get article by id';
  constructor(public payload: string) {}
}

export class GetByTitleDescription {
  static readonly type = '[Homepage] filter by title and description';
  constructor(public searchString: string, public url?: string) {}
}

export class UpdateFilterString {
  static readonly type = '[Homepage] update filter string';
  constructor(public payload: string) {}
}
