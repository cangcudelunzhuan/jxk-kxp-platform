import service from './service';
import personal from './personal';
import financial from './financial';
import goods from './goods';

const routerConf = [
  ...service,
  ...personal,
  ...financial,
  ...goods,
];

export default routerConf;
