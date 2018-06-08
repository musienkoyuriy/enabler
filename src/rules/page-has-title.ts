import Validator from '../validator';

export default function pageHasTitle($: any,content: string) {
  return new Validator({
    $template: $,
    content,
    selectors: 'html head',
    isInvalid: ($elem: any) => {
      const hasHead = $elem.length;
      const title = $elem.children('title');
      const hasNoTitle = (hasHead && !title.length) || (hasHead && !title.text());

      return hasNoTitle;
    },
    warningMessage: 'Page should have a title.'
  });
}
