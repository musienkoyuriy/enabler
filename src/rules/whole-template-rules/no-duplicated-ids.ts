import { getDuplicates } from '../../utils';
import WholeTemplateValidator from '../../whole-template-validator';

export default function noDuplicatedIds($: any): WholeTemplateValidator {
  return new WholeTemplateValidator({
    loadedTemplate: $,
    isInvalid: () => {
      const ids: string[] = [];

      $('[id]').each((_: number, elem: CheerioElement) =>
        ids.push($(elem).attr('id'))
      );

      return getDuplicates(ids).length > 0;
    },
    warningMessage: 'You have duplicated "id" attributes in your template'
  });
}
