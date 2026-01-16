import type { Activity } from '../../api/activities';

export interface ActivityItem extends Activity {
  distance?: number;
}
