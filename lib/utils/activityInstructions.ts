// Kadjot Fitness - Activity Instructions for Modal Display

export interface ActivityInstruction {
  title: string;
  duration: string;
  description: string;
  exercises: {
    name: string;
    reps?: string;
    sets?: string;
    duration?: string;
    instructions: string[];
    tips?: string[];
    imageUrl?: string;
    imageUrls?: string[]; // Support multiple images
  }[];
  progression?: string[];
  tips?: string[];
  warnings?: string[];
  fullReferenceLink?: string;
}

export const ACTIVITY_INSTRUCTIONS: Record<string, ActivityInstruction> = {
  'core': {
    title: '💪 Core Workout',
    duration: '15 minutes (2 min warm-up + 13 min workout)',
    description: 'Strengthens deep core stabilizers, improves posture, and builds a strong foundation for running and daily activities.',
    fullReferenceLink: '/DETAILED_CORE_PROGRAM.html#core-workout',
    exercises: [
      {
        name: '🔥 WARM-UP: Cat-Cow Stretches',
        reps: '10',
        instructions: [
          'Start on hands and knees (tabletop position)',
          'Hands under shoulders, knees under hips',
          'COW (Inhale): Drop belly, lift chest and tailbone, look up gently',
          'CAT (Exhale): Round spine, tuck chin to chest, tuck tailbone',
          'Flow smoothly between positions',
          'Each breath = 1 rep (Cow + Cat)'
        ],
        tips: [
          'Focus on spinal mobility and breathing rhythm',
          'Move with your breath',
          'Don\'t rush - quality over speed'
        ],
        imageUrl: '/images/ref/Cat-cow-graphic-pinterest.webp'
      },
      {
        name: '🔥 WARM-UP: Standing Torso Rotations',
        reps: '10 (5 each side)',
        instructions: [
          'Stand with feet hip-width apart, knees slightly bent',
          'Hands on hips or crossed at chest',
          'Keep hips facing forward (locked)',
          'Rotate torso to the right, then left',
          'GENTLE - no forcing or bouncing',
          'Head follows torso naturally',
          'Left + Right = 1 rep'
        ],
        tips: [
          'Warms up obliques and thoracic spine',
          'Avoid rotating from hips',
          'Don\'t twist too far or move too fast'
        ]
      },
      {
        name: '🔥 WARM-UP: Standing Knee Raises',
        reps: '5 per side',
        instructions: [
          'Stand tall, feet together',
          'Hands on hips or hold wall for balance',
          'Lift right knee toward chest',
          'Hold for 1 second at top',
          'Lower with control',
          'Repeat 5 times, then switch to left leg',
          'Keep standing leg slightly bent'
        ],
        tips: [
          'Prepares hip flexors for core work',
          'Maintain upright posture - don\'t lean back',
          'Activates core stabilizers'
        ]
      },
      {
        name: 'Dead Bug',
        reps: '10-15 per side',
        sets: '2-3',
        instructions: [
          'Lie on back, arms straight up to ceiling',
          'Knees bent at 90°, shins parallel to floor',
          'Press lower back into floor (engage core)',
          'Slowly lower opposite arm and leg toward floor',
          'Return to start, switch sides',
          'Keep lower back pressed to floor throughout'
        ],
        tips: [
          'Move slowly and controlled (3-4 seconds per rep)',
          'Stop if lower back arches off floor',
          'Focus on breathing: exhale as you extend'
        ],
        imageUrl: '/images/ref/Dead_Bug_F_WorkoutLabs.png'
      },
      {
        name: 'Glute Bridge',
        reps: '15-20',
        sets: '2-3',
        instructions: [
          'Lie on back, knees bent, feet flat on floor',
          'Feet hip-width apart, heels 6-8 inches from butt',
          'Press through heels to lift hips',
          'Squeeze glutes at top',
          'Hold for 2 seconds',
          'Lower slowly'
        ],
        tips: [
          'Keep core engaged',
          'Don\'t arch lower back excessively',
          'Push through heels, not toes'
        ],
        imageUrl: '/images/ref/SHP_MTM_Glute-Bridge_3x2-bfe761cd0ffb45e28875198ebed77038.jpg'
      },
      {
        name: 'Side Plank (Modified)',
        duration: '20-30 seconds per side',
        sets: '2-3',
        instructions: [
          'Lie on side, prop up on elbow (elbow under shoulder)',
          'Stack knees and feet',
          'Lift hips off ground, creating straight line from head to knees',
          'Keep top arm on hip or extended up',
          'Hold position, breathe steadily',
          'Don\'t let hips sag'
        ],
        tips: [
          'Keep shoulder pulled away from ear',
          'Body should form straight line',
          'Look forward, not down',
          'Progress to full side plank (bottom leg straight) when ready'
        ],
        imageUrls: [
          '/images/ref/bent-knee-side-plank.webp',
          '/images/ref/side-plank-pose-variation-one-knee-down_yoga.png'
        ]
      },
      {
        name: 'Bird Dog',
        reps: '6 per side',
        sets: '3',
        instructions: [
          'Start on hands and knees (tabletop position)',
          'Hands under shoulders, knees under hips',
          'Engage core, keep back flat',
          'Extend right arm forward and left leg back',
          'Hold 5 seconds, return to start',
          'Alternate sides'
        ],
        tips: [
          'No rotation or tilting',
          'Extended arm and leg parallel to ground',
          'Don\'t arch lower back',
          'Quality over speed',
          'Work on stability first before adding hold time'
        ],
        imageUrls: [
          '/images/ref/bird-dogs-exercise-illustration.jpg',
          '/images/ref/Bird+Dog+Exercise.jpg'
        ]
      }
    ],
    tips: [
      'ALWAYS start with the 2-minute warm-up - it\'s essential!',
      'Warm-up increases blood flow and prepares your spine',
      'Rest 30-60 seconds between sets',
      'Focus on controlled movements, not speed',
      'Engage your core before every rep'
    ],
    progression: [
      'Week 1-2: 2 sets of each exercise',
      'Week 3-4: 3 sets of each exercise',
      'Week 5-6: Add 5 reps to each exercise',
      'Week 7+: Add holds (3-5 sec) to static exercises'
    ],
    warnings: [
      'NEVER skip the warm-up - it reduces injury risk',
      'Stop if you experience sharp pain',
      'Never hold your breath - breathe throughout',
      'Quality over quantity - perfect form is key'
    ]
  },
  
  'desk-reset': {
    title: '⏰ Desk Reset',
    duration: '5-8 minutes',
    description: 'Counters sitting posture and computer work. Resets your spine, hips, and upper back.',
    fullReferenceLink: '/DETAILED_CORE_PROGRAM.html#daily-desk-reset',
    exercises: [
      {
        name: 'Seated Pelvic Tilts',
        reps: '10-15',
        instructions: [
          'Sit at edge of chair, feet flat on floor',
          'Sit up tall, neutral spine',
          'Tilt pelvis forward (arch lower back)',
          'Then tilt pelvis back (round lower back)',
          'Move slowly, feel the stretch',
          'Focus on moving from pelvis, not upper body'
        ],
        tips: [
          'This is a gentle movement',
          'Breathe normally throughout',
          'Helps restore lower back mobility'
        ],
        imageUrl: '/images/ref/seated_pelvic_tilt_tuck___yoga.png'
      },
      {
        name: 'Standing Hip Flexor Stretch',
        duration: '30 seconds per side',
        instructions: [
          'Stand in split stance (left foot forward)',
          'Right knee slightly bent',
          'Tuck pelvis under (posterior tilt)',
          'Lean forward slightly into stretch',
          'Feel stretch in front of right hip',
          'Switch sides'
        ],
        tips: [
          'Don\'t arch lower back',
          'Keep core engaged',
          'You should feel this in front of hip, not lower back'
        ],
        imageUrl: '/images/ref/standing+lunge+hip+flexor+stretch.webp'
      },
      {
        name: 'Seated Upper-Back Extension',
        reps: '8-12',
        instructions: [
          'Sit at edge of chair',
          'Hands behind head',
          'Slump forward (round upper back)',
          'Then extend backward (arch upper back)',
          'Look up slightly at top',
          'Feel movement in upper/mid back'
        ],
        tips: [
          'Move from upper back, not lower back',
          'Gentle, controlled movement',
          'Great for computer posture'
        ],
        imageUrl: '/images/ref/Seated-Thoracic-Spine-Collage.jpg'
      }
    ],
    tips: [
      'Do this 2-3 times during work day',
      'Even better: do every 2 hours',
      'Can be done in office attire',
      'Helps prevent lower back pain from sitting'
    ]
  },
  
  'running': {
    title: '🏃 Beach/Sand Running',
    duration: '20-30 minutes',
    description: 'Low-impact running that strengthens feet, ankles, and calves while reducing joint stress.',
    fullReferenceLink: '/DETAILED_CORE_PROGRAM.html#running-protocol',
    exercises: [
      {
        name: 'Running Protocol',
        duration: '20-30 minutes',
        instructions: [
          'Run on PACKED sand (near water line)',
          'Aim for MIDFOOT landing (not heel)',
          'Easy, conversational pace',
          'Run BOTH directions (balance slope)',
          '10-15 minutes one way, return same path',
          'Land softly, avoid pounding'
        ]
      }
    ],
    tips: [
      'Start with 20 minutes if new to sand running',
      'Increase to 30 minutes after 2 weeks',
      'Pack sand is better than soft sand initially',
      'Listen to your body - sand is more demanding',
      'Midfoot landing reduces impact on joints'
    ],
    warnings: [
      'ALWAYS run both directions to balance beach slope',
      'Start shorter if calves feel tight',
      'Soft sand is more intense - build up gradually'
    ],
    progression: [
      'Week 1-2: 20 minutes packed sand',
      'Week 3-4: 25 minutes packed sand',
      'Week 5+: 30 minutes, mix some soft sand sections'
    ]
  },
  
  'gym': {
    title: '🏋️‍♂️ Gym Workout',
    duration: '45-60 minutes',
    description: 'Targets posterior chain (glutes, hamstrings, lower back) and pulling muscles for balanced strength.',
    fullReferenceLink: '/DETAILED_CORE_PROGRAM.html#gym-workout',
    exercises: [
      {
        name: 'Leg Press (High Foot Position)',
        sets: '3',
        reps: '10',
        instructions: [
          'Position feet high and wide on platform',
          'This emphasizes glutes and hamstrings',
          'Lower weight until knees reach 90 degrees',
          'Press through heels to return',
          'Don\'t lock out knees at top'
        ],
        tips: [
          'Keep lower back pressed to seat',
          'Full range of motion',
          'Controlled tempo (2 seconds down, 1 second up)',
          'No bouncing at bottom',
          'Find weight where 10th rep is challenging but doable'
        ],
        imageUrls: [
          '/images/ref/Leg_Press_Foot_placement_Guide_Infographic.webp',
          '/images/ref/leg-press-foot-placement.webp'
        ]
      },
      {
        name: 'Cable Row (Seated)',
        sets: '3',
        reps: '12-15',
        instructions: [
          'Sit with feet braced, knees slightly bent',
          'Grab handle with both hands',
          'Sit up tall, shoulders back',
          'Pull handle to lower chest/upper abdomen',
          'Squeeze shoulder blades together',
          'Return slowly to start'
        ],
        tips: [
          'Don\'t use momentum - control the weight',
          'Think about pulling with elbows, not hands',
          'Keep chest up throughout'
        ],
        imageUrl: '/images/ref/rudern-kabelzug-800x448.webp'
      },
      {
        name: 'Goblet Squat',
        sets: '3',
        reps: '8-10',
        instructions: [
          'Hold dumbbell or kettlebell at chest (goblet position)',
          'Feet shoulder-width apart, toes slightly out',
          'Descend by pushing hips back and down',
          'Keep chest up, weight in heels',
          'Squat to comfortable depth (thighs parallel or slightly below)',
          'Drive through heels to stand'
        ],
        tips: [
          'Elbows point down',
          'Knees track over toes',
          'No rounding of lower back',
          'Full breath cycle each rep',
          'Starting weight: 10-15 kg dumbbell',
          'The weight helps counterbalance and improves form'
        ],
        imageUrls: [
          '/images/ref/Goblet+Squat.png',
          '/images/ref/mh-formcheck-goblet-squat-1553875310.avif'
        ]
      },
      {
        name: 'Back Extension (45°)',
        sets: '3',
        reps: '12-15',
        instructions: [
          'Position yourself on 45° back extension bench',
          'Hips at pad, body straight',
          'Lower torso toward floor (controlled)',
          'Raise back to horizontal',
          'Don\'t hyperextend - stop at neutral spine',
          'Keep core engaged throughout'
        ],
        tips: [
          'This targets lower back and glutes',
          'Can hold weight plate at chest to progress',
          'Move slowly and controlled'
        ],
        imageUrl: '/images/ref/rueckenstrecken.webp'
      }
    ],
    progression: [
      'Week 1-2: Learn form, lighter weight',
      'Week 3-4: Increase weight 5-10%',
      'Week 5-6: Increase weight another 5-10%',
      'Week 7+: Add 4th set to each exercise'
    ],
    warnings: [
      'Always warm up before lifting',
      'Use weight you can control with good form',
      'Stop if you feel sharp pain'
    ]
  },
  
  'mobility': {
    title: '🧘 Mobility & Stretching',
    duration: '12 minutes',
    description: 'Improves flexibility, reduces muscle tension, and enhances recovery.',
    fullReferenceLink: '/DETAILED_CORE_PROGRAM.html#mobility-stretching',
    exercises: [
      {
        name: 'Cat-Cow Stretch',
        reps: '10-15',
        instructions: [
          'Start on hands and knees',
          'Hands under shoulders, knees under hips',
          'COW: Drop belly, lift chest and tailbone (arch)',
          'CAT: Round spine, tuck chin and tailbone',
          'Flow smoothly between positions',
          'Breathe: inhale on cow, exhale on cat'
        ],
        tips: [
          'Move slowly and mindfully',
          'Feel the stretch through entire spine',
          'Great for morning stiffness'
        ],
        imageUrl: '/images/ref/Cat-cow-graphic-pinterest.webp'
      },
      {
        name: 'Child\'s Pose with Side Stretch',
        duration: '30-60 seconds per side',
        instructions: [
          'Start in child\'s pose (knees wide, sit on heels)',
          'Walk hands to left side',
          'Feel stretch along right side of torso',
          'Hold, breathe deeply',
          'Walk hands to center, then to right side',
          'Repeat on other side'
        ],
        tips: [
          'Very relaxing stretch',
          'Focus on breathing',
          'Let gravity help the stretch'
        ],
        imageUrl: '/images/ref/Childs+Pose+Side+Stretch.jpg'
      },
      {
        name: 'Knees-to-Chest',
        duration: '30-60 seconds',
        instructions: [
          'Lie on back',
          'Bring both knees toward chest',
          'Hug knees with arms',
          'Gently pull knees closer',
          'Relax shoulders and neck',
          'Breathe deeply'
        ],
        tips: [
          'Great for lower back relief',
          'Can rock gently side to side',
          'Very calming'
        ]
      },
      {
        name: 'Hip Flexor Stretch (Kneeling)',
        duration: '30-45 seconds per side',
        instructions: [
          'Start in lunge position',
          'Back knee on floor (use pad/mat)',
          'Front knee over ankle',
          'Tuck pelvis under',
          'Lean forward slightly',
          'Feel stretch in front of back hip'
        ],
        tips: [
          'Don\'t let front knee go past toes',
          'Keep torso upright',
          'Essential for runners and desk workers'
        ],
        imageUrl: '/images/ref/01.-diagram_Hip-Flexor-Stretch-.webp'
      }
    ],
    tips: [
      'Do this on rest days or after workouts',
      'Never bounce in stretches',
      'Breathe deeply and relax',
      'Consistency is more important than intensity'
    ]
  }
};

// Helper function to get instruction by activity ID
export function getActivityInstruction(activityId: string): ActivityInstruction | null {
  // Map activity IDs to instruction keys
  const idMap: Record<string, string> = {
    'core': 'core',
    'lunch': 'desk-reset',
    'afternoon': 'desk-reset',
    'run': 'running',
    'gym': 'gym',
    'mobility': 'mobility'
  };
  
  const instructionKey = idMap[activityId];
  return instructionKey ? ACTIVITY_INSTRUCTIONS[instructionKey] : null;
}
