export const evaluateOuterDrawerListItems = items => {
	const drawerItems = {};
	items.forEach((item, index) => {
		let { key } = item;
		// Delimiter _
		// key => DataSearch_Basic to DataSearch
		key = key.substr(0, key.indexOf('_'));
		if (key.length) {
			if (drawerItems.hasOwnProperty(key)) {
				drawerItems[key].end = index + 1;
			} else {
				drawerItems[key] = {
					start: index,
					end: 0,
				};
			}
		}
	});
	return drawerItems;
};

export const evaluateChildDrawerTitle = ({ navigation }) => ({
	title: navigation.state.key.substr(navigation.state.key.indexOf('_') + 1),
});

export const API_KEY = '90f8fe68e68b7bfa331aafe5d419c0de';

export const weatherConditions = {
	Rain: {
	  color: '#005BEA',
	  title: 'Raining',
	  subtitle: 'Get a cup of coffee',
	  icon: 'weather-rainy'
	},
	Clear: {
	  color: '#f7b733',
	  title: 'So Sunny',
	  subtitle: 'It is hurting my eyes',
	  icon: 'weather-sunny'
	},
	Thunderstorm: {
	  color: '#616161',
	  title: 'A Storm is coming',
	  subtitle: 'Because Gods are angry',
	  icon: 'weather-lightning'
	},
	Clouds: {
	  color: '#1F1C2C',
	  title: 'Clouds',
	  subtitle: 'Everywhere',
	  icon: 'weather-cloudy'
	},
  
	Snow: {
	  color: '#00d2ff',
	  title: 'Snow',
	  subtitle: 'Get out and build a snowman for me',
	  icon: 'weather-snowy'
	},
	Drizzle: {
	  color: '#076585',
	  title: 'Drizzle',
	  subtitle: 'Partially raining...',
	  icon: 'weather-hail'
	},
	Haze: {
	  color: '#66A6FF',
	  title: 'Haze',
	  subtitle: 'Another name for Partial Raining',
	  icon: 'weather-hail'
	},
	Mist: {
	  color: '#3CD3AD',
	  title: 'Mist',
	  subtitle: "Don't roam in forests!",
	  icon: 'weather-fog'
	}
  };