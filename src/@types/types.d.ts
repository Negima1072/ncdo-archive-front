interface ListItem {
  id: number;
  videoId: string;
  videoType: "normal" | "deleted";
  videoTitle: string | null;
  userId: number | null;
  count: {
    view: number | null;
    mylist: number | null;
    like: number | null;
    nowComment: number;
    totalComment: number;
  };
  updatedAt: string | null;
  requestedAt: string;
  status: 0 | 1 | 3;
}

interface ReserveData {
  id: number;
  title: string;
  videoId: string;
  requestedAt: string;
}

interface VideoData {
  id: number;
  title: string;
  videoId: string;
  commentNum: number;
  updatedAt: string;
}

interface ProgressData {
  id: number;
  title: string;
  videoId: string;
  comment: {
    now: number;
    total: number;
  };
  requestedAt: string;
}
