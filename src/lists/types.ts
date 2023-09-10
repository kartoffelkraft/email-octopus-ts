type Field = {
  tag: string;
  type: string;
  label: string;
  fallback: string;
};

type Counts = {
  pending: number;
  subscribed: number;
  unsubscribed: number;
};

export type List = {
  id: string;
  name: string;
  double_opt_in: boolean;
  fields: Array<Field>;
  counts: Counts;
  created_at: string;
};

export type Paging = {
  previous: string | null;
  next: string | null;
};
