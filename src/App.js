import { 
  skills, Trainee, numToGrade, weightedRandomPick, generateTrainees, 
  passingProbability, costsToString, multiplyObjVals, addObjVals, 
  stripFunctionsForJSON, isAffordable, maxAffordable,
  TrainingActivity, Rest, reconstructAllSchedules, reconstructStaff,
  generateManager, generateTrainer, passTime
} from './misc'
import './App.css';

import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect, useRef } from 'react';

function listTraineeMetrics(trainee, detail, grades) {
  let skills = []
  if (detail === 0) {
    skills = [trainee.overallSkill()]
  } else if (detail === 1) {
    skills = [trainee.idolSkill(), trainee.creativeSkill(), trainee.skills.entertainment]
  } else {
    skills = [
      trainee.skills.idol.vocal, trainee.skills.idol.dance, trainee.skills.idol.rap, trainee.skills.idol.performance,
      trainee.skills.creative.producing, trainee.skills.creative.lyrics, trainee.skills.creative.videography, trainee.skills.creative.choreography,
      trainee.skills.entertainment
    ]
  }
  const list = [
    trainee.fullName(), trainee.profile.age, trainee.profile.gender,
    ...skills,
    trainee.metrics.health, trainee.metrics.passion, trainee.metrics.happiness, trainee.metrics.trust
  ]
  return list
    .map((i, ind) => ((ind >= 3 || ind === 1) ? Math.floor(i) : i))
    .map((i, ind) => ((ind >= 3 && ind <= skills.length + 2 && grades) ? numToGrade(i) : i))
}

function Trainees(props) {
  const [detail, setDetail] = useState(0)
  const [grades, setGrades] = useState(false)
  const [columns, setColumns] = useState(["name", "age", "gender", "overall skills", "health", "passion", "happiness", "trust"])

  const levels = ["low", "medium", "high"]

  useEffect(() => {
    let skills = []
    if (detail === 0) {
      skills = ["overall skill"]
    } else if (detail === 1) {
      skills = ["idol skill", "creative skill", "entertainment"]
    } else {
      skills = ["vocal", "dance", "rap", "perf.", "prod.", "lyrics", "video.", "choreo.", "ent."]
    }
    setColumns(["name", "age", "gender", ...skills, "health", "passion", "happiness", "trust"])
  }, [detail])
 
  return (
    <div className="trainee-grid"> 
      <div className="settings">
        <div className="inverted button" onClick={() => setDetail(prev => (prev + 1) % 3)}>detail: {levels[detail]}</div>
        <div className="inverted button" onClick={() => setGrades(prev => !prev)}>show: {["numbers", "grades"][Number(grades)]}</div>
      </div>
      <div className="trainee-grid-row" style={{gridTemplateColumns: `repeat(${columns.length}, 1fr)`}}>
        {columns.map(i => <div>{i}</div>)}
      </div>
      {Object.values(props.trainees).map((trainee) => {
        return (
          <div className="trainee-grid-row" style={{gridTemplateColumns: `repeat(${columns.length}, 1fr)`}}>
            {listTraineeMetrics(trainee, detail, grades).map((i) => <div>{i}</div>)}
          </div>
        )
      })}
    </div>
  )
}

function Audition(props) {
  const types = ["social media", "physical", "campaign"]
  const costs = [
    {"money": 0, "energy": 2},
    {"money": 30, "energy": 5},
    {"money": 1000, "energy": 5}
  ]
  const peak = [30, 50, 70]

  const [type, setType] = useState(0)
  const [number, setNumber] = useState(1)
  const [threshold, setThreshold] = useState(50)

  return (
    <div className="body recruiting">
      <div className="recruiting-buttons">
        {types.map(
          (name, ind) => (
            <button 
              onClick={() => {
                const locked = ind * 10 > props.resources.level
                if (!locked) {
                  setType(ind)
                }
              }}
              className={"square " + (type === ind ? "selected" : "") + (ind * 10 > props.resources.level ? " locked" : "")}
            >{name}</button>
          )
        )}
      </div>
      <div className="params">
        <div>
          <div>number of trainees: {number}</div>
          <input type="range" id="trainee-num" name="trainee-num" className="slider" min="1" max={maxAffordable(props.resources, costs[type])} step="1" onChange={e => {setNumber(e.target.value)}} />
        </div>
        <div>
          <div>score threshold: {threshold} ({numToGrade(threshold)}) and above</div>
          <input type="range" id="trainee-threshold" name="trainee-threshold" className="slider" min="0" max="100" step="1" onChange={e => {setThreshold(e.target.value)}} />
        </div>
      </div>
      <div className="recruiting-child">
        <div>the average score for this type of audition is {peak[type]}.</div>
        <div>you will get ~{Math.floor(number * passingProbability(peak[type], threshold, 9) / 100)} trainee(s). ({passingProbability(peak[type], threshold, 9)}% success rate)</div>
        <div>cost: {costsToString(multiplyObjVals(costs[type], number))} ({costsToString(costs[type])} per trainee)</div>
      </div> 
      <button 
        className={"small " + (isAffordable(props.resources, costs[type]) ? "" : "locked")}
        onClick={() => {
          const totalCost = multiplyObjVals(costs[type], number)
          if (isAffordable(props.resources, totalCost)) {
            const expenses = multiplyObjVals(totalCost, -1)
            expenses["exp"] = 10 * number
            props.setResources(prev => addObjVals(prev, expenses))
            const newTrainees = generateTrainees(number, peak[type], threshold, props.time)
            props.addNotification(`you have ${Object.keys(newTrainees).length} new trainee(s).`, 30000)
            props.setTrainees(prev => {return {...prev, ...newTrainees}})
            const traineeSchedule = props.schedule.trainees
            traineeSchedule.groups[traineeSchedule.defaultGroup].members = [
              ...traineeSchedule.groups[traineeSchedule.defaultGroup].members,
              ...Object.keys(newTrainees)
            ]
          }
        }}
      >confirm</button>
    </div>
  )
}

function Schedule(props) {
  const groups = props.schedule.trainees.groups
  const group = groups[Object.keys(groups)[0]]

  const trainingActivities = Object.values(skills).flat()
    .filter(skill => props.staff.trainers[skill])
    .map(skill => new TrainingActivity(skill)) 
  trainingActivities.push(new Rest())

  return (
    <div className="schedule-interface">
      <div className="schedule-trainee-list">
        <div className="label">trainees in this group:</div>
        <div className="schedule-trainee-scroll-box">
          {groups[Object.keys(groups)[0]].members.map(trainee => <div>{props.trainees[trainee].fullName()}</div>)}
        </div>
      </div>
      <div className="schedule-grid">
        <div className="corner-cell grid-cell"></div>
        {["monday", "tuesday", "wednesday", "thursday", "friday"].map(day => (
          <div className="col-header grid-cell" key={day}>{day}</div>
        ))}
        {["morning", "afternoon", "evening"].map((time, timeidx) => (
          <React.Fragment>
            <div className="row-header grid-cell">{time}</div>
            {group.schedule.map((day, dayidx) => (
              <div 
                className="grid-cell content-cell" 
                style={{backgroundColor: day[timeidx].color}}
                onClick={() => {
                  if (props.selectedActivity) {
                    props.setSchedule(prev => {
                      const newSchedule = {...prev}
                      newSchedule.trainees.groups[Object.keys(groups)[0]].schedule[dayidx][timeidx] = props.selectedActivity
                      return newSchedule
                    })
                  }
                }}
              >{day[timeidx].name}</div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="schedule-options">
        <div className="label">select activities:</div>
        <div className="schedule-options-grid">
          {trainingActivities.map(activity => <div 
            className={`grid-cell content-cell ${activity.name === "rest" ? "wide" : ""}`}
            style={{
              backgroundColor: activity.color,
              border: (props.selectedActivity && props.selectedActivity.name === activity.name) ? "white solid 2px" : "none"
            }}
            onClick={() => {
              props.setSelectedActivity(prev => {
                if (!prev) {
                  return activity
                } else if (prev.name === activity.name) {
                  return null
                } else {
                  return activity
                }
              })
            }}
          >{activity.name}</div>)}
        </div>
      </div>
    </div>
  )
}

function Staff(props) {
  const [grades, setGrades] = useState(false)
  const columns = ["position", "name", "age", "gender", "skill score"]
 
  return (
    <div className="staff-info"> 
      <div className="settings">
        <div className="inverted button" onClick={() => setGrades(prev => !prev)}>show: {["numbers", "grades"][Number(grades)]}</div>
      </div>
      <div className="staff-grid">
        <div className="staff-grid-row" style={{gridTemplateColumns: `repeat(${columns.length}, 1fr)`}}>
          {columns.map(i => {return <div>{i}</div>})}
        </div>
        {Object.values(props.staff.trainers).filter(trainer => trainer).map((trainer) => {
          return (
            <div className="staff-grid-row" style={{gridTemplateColumns: `repeat(${columns.length}, 1fr)`}}>
              {[
                `${trainer.skill} trainer`,
                trainer.fullName(), Math.round(trainer.profile.age), trainer.profile.gender, 
                Math.round(trainer.score)
              ].map((i) => <div>{i}</div>)}
            </div>
          )
        })}
      </div>
      <div className="staff-grid">
        <div className="staff-grid-row" style={{gridTemplateColumns: `repeat(${columns.length-1}, 1fr)`}}>
          {columns.slice(1).map(i => <div>{i}</div>)}
        </div>
        {Object.values(props.staff.managers).map((manager) => {
          return (
            <div className="staff-grid-row" style={{gridTemplateColumns: `repeat(${columns.length-1}, 1fr)`}}>
              {[
                manager.fullName(), Math.round(manager.profile.age), manager.profile.gender, 
                Math.round(manager.score)
              ].map((i) => <div>{i}</div>)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Hire(props) {
  const cost = {"money": 0, "energy": 2}
  const peak = Math.min(Math.sqrt(props.resources.reputation) + 20, 100)
  const types = ["trainer", "manager"]

  const [number, setNumber] = useState(1)
  const [type, setType] = useState("trainer")
  const [threshold, setThreshold] = useState(50)

  return (
    <div className="body recruiting">
      <div className="recruiting-buttons">
        {types.map(
          name => (
            <button 
              onClick={() => setType(name)}
              className={"square " + (type === name ? "selected" : "")}
            >{name}</button>
          )
        )}
      </div>      
      <div className="params">
        <div>
          <div>number of staff: {number}</div>
          <input type="range" id="trainee-num" name="trainee-num" className="slider" min="1" max={maxAffordable(props.resources, cost)} step="1" onChange={e => {setNumber(e.target.value)}} />
        </div>
        {(type === "manager") && <div>
          <div>score threshold: {threshold} ({numToGrade(threshold)}) and above</div>
          <input type="range" id="trainee-threshold" name="trainee-threshold" className="slider" min="0" max="100" step="1" onChange={e => {setThreshold(e.target.value)}} />
        </div>}
      </div>
      <div className="recruiting-child">
        <div>the average score for this type of audition is {peak}.</div>
        <div>you will get ~{Math.floor(number * passingProbability(peak, threshold) / 100)} staff. ({passingProbability(peak, threshold)}% success rate)</div>
        <div>cost: {costsToString(multiplyObjVals(cost, number))} ({costsToString(cost)} per staff member)</div>
        {type === "trainer" && <div>you can only have one trainer for each skill, and only the best trainer will be kept.</div>}
      </div> 
      <button 
        className={"small " + (isAffordable(props.resources, cost) ? "" : "locked")}
        onClick={() => {
          const totalCost = multiplyObjVals(cost, number)
          if (isAffordable(props.resources, totalCost)) {
            const expenses = multiplyObjVals(totalCost, -1)
            expenses["exp"] = 10 * number
            props.setResources(prev => addObjVals(prev, expenses))
            let count = 0
            let newTrainerSkills = []
            for (let i = 0; i < number; i++) {
              if (type === "manager") {
                const manager = generateManager(peak, props.time)
                if (manager.score >= threshold) {
                  count++
                  props.setStaff(prev => {
                    const newStaff = {...prev}
                    newStaff.managers.push(manager)
                    return newStaff
                  })
                }
              } else if (type === "trainer") {
                const trainer = generateTrainer(peak, props.time)
                props.setStaff(prev => {
                  const prevTrainer = prev.trainers[trainer.skill]
                  if (!prevTrainer || prevTrainer.score < trainer.score) {
                    const newTrainers = {...prev}
                    newTrainers.trainers[trainer.skill] = trainer
                    return newTrainers
                  }
                  return prev
                })
                if (!newTrainerSkills.includes(trainer.skill)) {
                  newTrainerSkills.push(trainer.skill)
                }
              }
            }
            if (type === "manager") {
              props.addNotification(`you got ${count} new managers!`)
            } else if (type === "trainer") {
              props.addNotification(`you got new trainers for the following skills: ${newTrainerSkills.join(", ")}`)
            }
          }
        }}
      >confirm</button>
    </div>
  )
}

function load() {
  const raw = localStorage.getItem("data");

  const staff = {
    trainers: {},
    managers: []
  }

  for (const skill of Object.values(skills).flat()) {
    staff.trainers[skill] = null
  }

  if (raw) {
    const data = JSON.parse(raw);
    data.schedule = reconstructAllSchedules(data.schedule)
    data.staff = reconstructStaff(data.staff)
    data.trainees = Object.fromEntries(
      Object.values(data.trainees).map(i => {
        const trainee = new Trainee(i)
        return [trainee.id, trainee]
      })
    )
    return data
  } else {
    return {
      time: {
        year: 1,
        month: 1,
        week: 1
      },
      schedule: {
        trainees: {
          defaultGroup: "default",
          groups: {
            default: {
              members: [], 
              schedule: Array(5).fill(null).map(() => Array(3).fill(new Rest()))
            }
          }
        }
      },
      resources: {
        reputation: 0,
        money: 1e6,
        energy: 100,
        level: 0, 
        exp: 0
      },
      trainees: {},
      staff: staff
    };
  }
}

function NotificationBar(props) {
  // remove expired notifications automatically
  useEffect(() => {
    if (props.notifications.length === 0) return;

    const now = Date.now();
    const timers = props.notifications.map((notif) => {
      const timeLeft = notif.timeout - now;
      if (timeLeft <= 0) {
        // already expired, remove immediately
        props.setNotifications((prev) => prev.filter((n) => n.id !== notif.id));
        return null;
      }
      // set a timeout to remove notification
      return setTimeout(() => {
        props.setNotifications((prev) => prev.filter((n) => n.id !== notif.id));
      }, timeLeft);
    });

    return () => {
      timers.forEach((t) => t && clearTimeout(t));
    };
  }, [props.notifications, props.setNotifications]);

  function removeNotification(id) {
    props.setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  if (props.notifications.length === 0) return null;

  return (
    <div className="notification-panel">
      {props.notifications.map(({ id, text }) => (
        <div key={id} className="notification">
          <span className="notif-text">{
            text.split("\n").filter(i => i).map(line => <div>{line}<br/></div>)
          }</span>
          <button
            className="close-btn"
            onClick={() => removeNotification(id)}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [data, setData] = useState(load())

  const tabs = ["trainees", "artists", "staff", "schedule"]
  const [subtabs, setSubtabs] = useState([["list", "audition"], ["new"], ["manage", "hire"], []])
  
  const [tab, setTab] = useState(0)
  const [subtab, setSubtab] = useState(0)

  const [time, setTime] = useState(data.time)
  const [schedule, setSchedule] = useState(data.schedule)
  const [resources, setResources] = useState(data.resources)
  const [staff, setStaff] = useState(data.staff)
  const [trainees, setTrainees] = useState(data.trainees)

  const [selectedActivity, setSelectedActivity] = useState(null)

  const [notifications, setNotifications] = useState([])

  function addNotification(text, durationMs = 30000) {
    const newNotif = {
      id: uuidv4(),
      text,
      timeout: Date.now() + durationMs,
    };
    setNotifications((prev) => [...prev, newNotif]);
  }

  function Body() {
    switch(tab) {
      case 0:
        switch (subtab) {
          case 0:
            return <Trainees trainees={trainees} />
          case 1:
            return <Audition 
              setTrainees={setTrainees} time={time}
              resources={resources} setResources={setResources} 
              schedule={schedule}
              addNotification={addNotification}
            />
        }
      case 2:
        switch (subtab) {
          case 0:
            return <Staff staff={staff} />
          case 1:
            return <Hire 
              resources={resources} setResources={setResources} 
              staff={staff} setStaff={setStaff} 
              addNotification={addNotification}
            />
        }
      case 3:
        return <Schedule 
          tab={tab} subtab={subtab} 
          schedule={schedule} setSchedule={setSchedule} 
          trainees={trainees} 
          selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity}
          staff={staff}
        />
    }
  }

  useEffect(() => {
    setSubtabs(prev => {
      const newSubtabs = [...prev]
      newSubtabs[3] = Object.keys(schedule.trainees.groups)
      return newSubtabs
    })
  }, [tab, subtab])

  const dataRef = useRef({ time, schedule, resources, trainees, staff });

  useEffect(() => {
    dataRef.current = { time, schedule, resources, trainees, staff };
    localStorage.setItem("data", JSON.stringify(stripFunctionsForJSON(dataRef.current)))
  }, [time, schedule, resources, trainees, staff]);

  useEffect(() => {
    if (time.year !== 1 || time.month !== 1 || time.week !== 1) {
      setSchedule(data.schedule)
      setResources(data.resources)
      setTrainees(data.trainees)
      setStaff(data.staff)
    }
  }, [time.year, time.month, time.week])

  return (
    <div className="App">
      <div className="navbar">
        <div className="tabs">
          {tabs.map(
            (name, ind) => {
              return (
                <div 
                  onClick={() => {setTab(ind); setSubtab(0)}}
                  className={ind === tab ? "selected" : ""}
                >{name}</div>
              )
            }
          )}
        </div>
        <div className="metrics">
          <div className="money">${resources.money}</div>
          <div>{resources.energy}⚡️</div>
          <div className="level">level {resources.level} ({resources.exp}/{(resources.level + 1) * 100})</div>
          <div
            onClick={() => {
              setData({...passTime(data, addNotification)})
              setTime({...data.time})
            }}
          >year {time.year}, month {time.month}, week {time.week}</div>
        </div>
      </div>
      <div className="navbar">
        <div className="subtabs">
          {subtabs[tab].map(
            (name, ind) => {
              return (
                <div 
                  onClick={() => setSubtab(ind)} 
                  className={ind === subtab ? "selected" : ""}
                >{name}</div>
              )
            }
          )}
        </div>
      </div>
      <div className="body">
        <Body />
      </div>
      <NotificationBar notifications={notifications} setNotifications={setNotifications} />
    </div>
  );
}

export default App;
