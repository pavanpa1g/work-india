
  export const loadData = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
  ];



  export const apiConstants = {
    initial: "initial",
    inProgress: "inProgress",
    success: "success",
    failure: "failure",
  };


export const navLinksData = [
  {
    title: "Popular",
    link: "/",
  },
  {
    title: "Top Rated",
    link: "/top-rated",
  },
  {
    title: "Upcoming",
    link: "/upcoming",
  },
];



export  const data = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
  {
    id: 9,
  },
  {
    id: 10,
  },
];




export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};