export const filterCalls = (call, status, kind, system, user) => {
  // ! solo parametro
  if (status !== "" && kind === "" && system === "" && user === "") {
    return call.status === status;
  }

  if (status === "" && kind !== "" && system === "" && user === "") {
    return call.kind === kind;
  }

  if (status === "" && kind === "" && system !== "" && user === "") {
    return call.system === system;
  }

  if (status === "" && kind === "" && system === "" && user !== "") {
    return call.user._id === user;
  }

  //2 parametros
  if (status !== "" && kind !== "" && system === "" && user === "") {
    return call.status === status && call.kind === kind;
  }

  if (status === "" && kind !== "" && system !== "" && user === "") {
    return call.kind === kind && call.system === system;
  }

  if (status === "" && kind === "" && system !== "" && user !== "") {
    return call.system === system && call.user._id === user;
  }

  if (status !== "" && kind === "" && system !== "" && user === "") {
    return call.status === status && call.system === system;
  }

  if (status !== "" && kind === "" && system === "" && user !== "") {
    return call.status === status && call.user._id === user;
  }

  if (status === "" && kind !== "" && system === "" && user !== "") {
    return call.kind === kind && call.user._id === user;
  }

  //3  parametros
  if (status !== "" && kind !== "" && system !== "" && user === "") {
    return (
      call.status === status && call.kind === kind && call.system === system
    );
  }

  if (status === "" && kind !== "" && system !== "" && user !== "") {
    return (
      call.kind === kind && call.system === system && call.user._id === user
    );
  }

  if (status !== "" && kind === "" && system !== "" && user !== "") {
    return (
      call.status === status && call.system === system && call.user._id === user
    );
  }

  if (status !== "" && kind !== "" && system === "" && user !== "") {
    return (
      call.status === status && call.kind === kind && call.user._id === user
    );
  }

  //todos los parametros
  if (status !== "" && kind !== "" && system !== "") {
    return (
      call.status === status && call.kind === kind && call.system === system
    );
  }
};
