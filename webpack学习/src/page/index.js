/**
 * Created by yiper on 2017/9/4.
 */

import add from '../other/add';
import $ from 'jquery'
import '../css/base.css'
import '../css/style.css'

$.ajax('/sdf.txt');

console.log(add()+100);

