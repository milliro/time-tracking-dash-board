const navLinks = document.querySelectorAll('.nav-list a')
const current = document.querySelectorAll('.current')
const previous = document.querySelectorAll('.previous')

const getJSON = async () => {
  const response = await fetch('./data.json')
  return await response.json()  
}

const daily = () => {
  getJSON().then(value => {
    current.forEach((item, i) => {
      const dailyCurrent = value[i].timeframes.daily.current
      item.innerHTML = pluralOrSingular(dailyCurrent)
    })

    previous.forEach((item, i) => {
      const dailyPrevious = value[i].timeframes.daily.previous
      item.innerHTML = `Previous - ${pluralOrSingular(dailyPrevious)}`
    })
  })
  navLinks[0].classList.add('active')
}

const weekly = () => {
  getJSON().then(value => {
    current.forEach((item, i) => {
      const weeklyCurrent = value[i].timeframes.weekly.current
      item.innerHTML = pluralOrSingular(weeklyCurrent)
    })

    previous.forEach((item, i) => {
      const weeklyPrevious = value[i].timeframes.weekly.previous
      item.innerHTML = `Last Week - ${pluralOrSingular(weeklyPrevious)}`
    })
  })
}

const monthly = () => {
  getJSON().then(value => {
    current.forEach((item, i) => {
      const monthlyCurrent = value[i].timeframes.monthly.current
      item.innerHTML = pluralOrSingular(monthlyCurrent)
    })

    previous.forEach((item, i) => {
      const monthlyPrevious = value[i].timeframes.monthly.previous
      item.innerHTML = `Last Month - ${pluralOrSingular(monthlyPrevious)}`
    })
  })
}

const pluralOrSingular = value => {
  return value !== 1 ? `${value}hrs` : `${value}hr`
}

const resetClass = () => {
  navLinks.forEach(item => {
    item.classList.remove('active')
  })
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    resetClass()
    link.classList.add('active')

    if (link.id === 'daily') {
      return daily()
    }
    
    if (link.id === 'weekly') {
      return weekly()
    }
    
    if (link.id === 'monthly') {
      return monthly()
    }
  })
})

daily()