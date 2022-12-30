export const currentDate = new Date();

export const weekDateFormat = (newDate) => {
  const d = new Date(newDate);
  return d;
};

export const monthDateFormat = (newDate) => {
  const d = new Date(newDate);
  return d.getMonth();
};

// BAR GRAPH DATAS
export const monthDatas = (refData, status) => {
  const month = refData.filter(
    (r) => monthDateFormat(r.createdAt) === monthDateFormat(currentDate) && r.status === status
  );
  return month.length;
};
export const weekDatas = (refData, status) => {
  const previousWeek = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  const week = refData.filter((r) => weekDateFormat(r.createdAt) >= previousWeek && r.status === status);
  return week.length;
};
export const yearDatas = (refData, status) => {
  const year = refData.filter(
    (r) => yearDateFormat(r.createdAt) === yearDateFormat(currentDate) && r.status === status
  );
  return year.length;
};
export const yearDateFormat = (newDate) => {
  const d = new Date(newDate);
  return d.getFullYear();
};
export const filterPending = (refData) => {
  const d = refData.filter((r) => r.status === 'Pending');
  return d.length;
};
export const filterCompleted = (refData) => {
  const d = refData.filter((r) => r.status === 'Completed');
  return d.length;
};
export const typeCollector = (label, refData) => {
  const data = [];
  label.forEach((el) => {
    const list = refData.filter((r) => r?.type === el || r?.facility === el);
    data.push(list.length);
  });

  return data;
};
