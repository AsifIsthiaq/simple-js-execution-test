const res = {
    success: {
      data: {
        user: {
          id: 941,
          firstName: 'Asif',
          lastName: 'Isthiaq',
          list:[11,22]
        }
      },
      name:"olita"
    }
  };
  
  const responseParams = {
    firstName: '{{success.data.user.list[1]}}',
    // lastName: '{{success.data.user.lastName}}',
    // fullName: '{{success.data.user.firstName}} {{success.data.user.lastName}} {{success.data.user.id}} {{success.name}}'
  };
  
  // Function to resolve the value from data based on the dynamic path
  function resolvePath(path, data) {
    // return path.split('.').reduce((acc, part) => 
    // {   console.log(acc, part);
    //     console.log(acc?.[part])
    //     return acc?.[part];
    // }
    // , data);
    return path.split(/\.|\[|\]/g).filter(Boolean).
    reduce((acc, part) => 
      {   console.log(acc, part);
          console.log(acc?.[part])
          return acc?.[part];
      }
      , data);
  }
  
  // Function to replace placeholders in the responseParams
  function replacePlaceholders(params, data) {
    return Object.fromEntries(
      Object.entries(params).map(([key, value]) => {
        // Replace placeholders using a regular expression
        console.log(`Key: ${key} Value: ${value}`)
        const replacedValue = value.replace(/{{([^}]+)}}/g, (_, path) => {
          console.log(`Path: ${path}`)
          const resolvedValue = resolvePath(path, data);
          console.log(`resolvedValue: ${resolvedValue}`)
          return resolvedValue ?? '';
        });
        console.log(`replacedValue: ${replacedValue}`)
        return [key, replacedValue];
      })
    );
  }
  
  const constructedResponse = replacePlaceholders(responseParams, res);
  
  console.log(constructedResponse);

  // function resolvePath2(path, data) {
  //   // Split by dot and handle array indexes
  //   return path.split(/\.|\[|\]/g).filter(Boolean).reduce((acc, part) => acc?.[part], data);
  // }

  // console.log( "results[[[[0]].name".split(/\.|\[|\]/g).filter(Boolean))

  