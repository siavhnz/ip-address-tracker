const Container = ({ children }) => {
  return (
    <div className="text-center flex flex-col md:text-left md:px-8 md:mt-3 md:pb-3 lg:border-r border-r-dark-gray last-of-type:border-none">
      {children}
    </div>
  );
};

const IPSpec = ({ label, value, isLoading }) => {
  if (isLoading) {
    return (
      <Container>
        <span className="uppercase animate-pulse text-dark-gray font-rubik font-bold text-[0.65rem] tracking-widest md:text-[0.8rem]">
          {label}
        </span>
        <div className="h-4 mt-4 animate-pulse bg-slate-200 rounded col-span-1"></div>
      </Container>
    );
  }

  return (
    <Container>
      <span className="uppercase text-dark-gray font-rubik font-bold text-[0.65rem] tracking-widest md:text-[0.8rem]">
        {label}
      </span>
      <span className="text-xl font-bold md:pl-1 md:pt-2 md:text-[1.55rem] leading-8">
        {value}
      </span>
    </Container>
  );
};

export default IPSpec;
