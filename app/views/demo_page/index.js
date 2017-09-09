import $ from 'jquery';
import XTemplate from 'xtemplate/lib/runtime';

import './index.less';
// 打包时，只会引入cube方法的代码
import { cube } from './as_require';
import contentXtpl from './xtpl/content.xtpl';

const init = () => {
    cube(1);

    let contentHTML = new XTemplate(contentXtpl).render({
        text: 'Hello XTemplate'
    });
    $('body').append(contentHTML);
};

init();
