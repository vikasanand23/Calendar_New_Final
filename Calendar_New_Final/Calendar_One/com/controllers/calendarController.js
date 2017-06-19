angular.module('app').controller('calendarController', ['$scope', '$filter', 'moment', 'alert', '$rootScope', function($scope, $filter, moment, alert, $rootScope) {

    date = new Date(),
        days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.current_month = date.getMonth();
    $scope.month_name = months[$scope.current_month];
    $scope.years = date.getFullYear();
    $scope.today = date.getDate();

    $scope.title = "Welcome to calendar1Funcqqqqq";
    $scope.calendar1Content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
    var getDateParts = function(date) {
        month = (new Date(date)).getMonth(),
		day = (new Date(date)).getDate(),
		year = (new Date(date)).getFullYear(),
		fullDate = date,
		first = (new Date(date)).getDate() - (new Date(date)).getDay(),
		last = first + 6,
		dayFromDate = day,
		dayToDate = day,
		weekFromDate = new Date((new Date(date)).setDate(first)).getTime(),
		weekToDate = new Date((new Date(date)).setDate(last)).getTime(),
        monthFromDate = new Date((new Date(date)).getFullYear(), (new Date(date)).getMonth(), 1).getTime(),
        monthToDate = new Date((new Date(date)).getFullYear(), (new Date(date)).getMonth() + 1, 0).getTime(),
        yearFromDate = new Date((new Date(date)).getFullYear(), 0, 1).getTime(),
        yearToDate = new Date((new Date(date)).getFullYear(), 11, 31).getTime();
        return {
            month: month,
            day: day,
            year: year,
            fullDate: fullDate,
            first: first,
            last: last,
            dayFromDate: dayFromDate,
            dayToDate: dayToDate,
            weekFromDate: weekFromDate,
            weekToDate: weekToDate,
            monthFromDate: monthFromDate,
            monthToDate: monthToDate,
            yearFromDate: yearFromDate,
            yearToDate: yearToDate
        }
    }
    $scope.dateObj = getDateParts(new Date());
    //console.log($scope.dateObj);
    //to set active class on current tab
    $scope.setActiveType = function(type, dateObj) {
        $scope.displayValue = $scope.getValue(type, dateObj);
        //console.log(":::::::::" + $scope.getValue(type, dateObj));
    };

    //to get the value based on the selected type(active tab)
    $scope.getValue = function(type, dateObj) {
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        $scope.cur_month = month;

        var first_of_months = new Date(date.getFullYear(), $scope.cur_month, 1);
        var showMonthName = monthNames[$scope.cur_month];
        //console.log(showMonthName);
        $scope.first_day_month = first_of_months.getDay();
        //console.log($scope.first_day_month);	
        var first_day_month = Math.floor((days[$scope.cur_month] + date.getDay() + 10) / 7);
        days[1] += CheckLeapYear($scope.years) ? 1 : 0;
        //console.log("dfjgkghkdfgjdf"+first_day_month);	
		//Get Month Value
        $scope.months = [];
        day_number = 1;
        for (i = 0; i < first_day_month; i++) {
            $scope.months[i] = [];
            //console.log($scope.weeks[i])
            for (j = 0; j < 7; j++) {
                $scope.months[i][j] = {};
                if (i == 0 && j < $scope.first_day_month) {
                    $scope.months[i][j].day = "";
                    $scope.months[i][j].isEvent = false;
                } else {
                    if (day_number <= days[$scope.cur_month]) {
                        $scope.months[i][j].day = day_number;
                        $scope.months[i][j].isEvent = false;
                        day_number++;
                        //console.log(days[$scope.cur_month]); 
                    }
                }
            }
        }

        //console.log($scope.months);

        // Get Week Calendar...................................
        Date.prototype.getWeek = function() {
            var onejan = new Date(this.getFullYear(), 0, 1);
            return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
        }

        var weekNumber = (new Date()).getWeek();

        var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var now = new Date();
        //console.log(dayNames[now.getDay()] + " (" + weekNumber + ").");

        var day = dayNames[now.getDay()]

        //console.log(day);
        function dates(current) {
            var week = new Array();
            // Starting Monday not Sunday
            current.setDate((current.getDate() - current.getDay()));
            for (var i = 0; i < 7; i++) {
                week.push(
                    new Date(current)
                );
                current.setDate(current.getDate() + 1);
            }
            return week;
        }
        $scope.weekFromDate = (dates(new Date(date)));
        //console.log($scope.weekFromDate);
		
        // Create Week Time _________________________________________
        $scope.weekTime = [];
        for (var i = 0; i < 24; i++) {
            $scope.weekTime.push(i + ":00");
        }
        //console.log($scope.weekTime);


        //            var curr = new Date; // get current date
        //            var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        //            var last = first + 7; // last day is the first day + 6
        //
        //            var firstday = new Date(curr.setDate(first))
        //            var lastday = new Date(curr.setDate(last))
        //
        //            console.log(firstday);
        //            console.log(lastday);

        //            function getWeekNumber(d) {
        //                // Copy date so don't modify original
        //                d = new Date(+d);
        //                d.setHours(0, 0, 0);
        //                // Set to nearest Thursday: current date + 4 - current day number
        //                // Make Sunday's day number 7
        //                d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        //                // Get first day of year
        //                var yearStart = new Date(d.getFullYear(), 0, 1);
        //                // Calculate full weeks to nearest Thursday
        //                var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
        //                // Return array of year and week number
        //                return [d.getFullYear(), weekNo];
        //            }
        //
        //            function weeksInYear(year) {
        //                var month = 11,
        //                    day = 31,
        //                    week;
        //                do {
        //                    d = new Date(year, month, day--);
        //                    week = getWeekNumber(d)[1];
        //                } while (week == 1);
        //
        //                return week;
        //            }
        //
        //            totalWeeks = weeksInYear(year);
        //            console.log(totalWeeks); // 53
        //
        //
        //            function getWeekNumber(d) {
        //                // Copy date so don't modify original
        //                d = new Date(+d);
        //                d.setHours(0, 0, 0, 0);
        //                // Set to nearest Thursday: current date + 4 - current day number
        //                // Make Sunday's day number 7
        //                d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        //                // Get first day of year
        //                var yearStart = new Date(d.getFullYear(), 0, 1);
        //                // Calculate full weeks to nearest Thursday
        //                var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        //                // Return array of year and week number
        //                return [d.getFullYear(), weekNo];
        //            }
        //
        //            var result = getWeekNumber(new Date());
        //            console.log('It\'s currently week ' + result[1] + ' of ' + result[0]);
        //
        //
        //            $scope.weeks1 = [];
        //            console.log($scope.weeks1);
        //            //day_number=1;
        //            for (i = 0; i < totalWeeks; i++) {
        //                $scope.weeks1[i] = [];
        //                //console.log($scope.weeks[i])
        //                for (j = 0; j < 7; j++) {
        //                    if (i == 0 && j < lastday) {
        //                        $scope.weeks1[i][j] = "";
        //                    } else {
        //                        if (firstday <= lastday) {
        //                            $scope.weeks1[i][j] = firstday;
        //                            firstday++;
        //                            //console.log(firstday.length); 
        //                        }
        //                    }
        //                } // end for days semana
        //            } // end for weeks


        //console.log($scope.weeks);	
        //					$scope.years=[];
        //					year_number=2017;
        //					
        //					for(k=0, k<2030

        function CheckLeapYear(year) {
            return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
        }
		
		$scope.weekVisible = false;
    	$scope.monthVisible = true;
		
        $scope.weekShow = function() {
            //console.log("Clicked");
            $scope.weekVisible = true;
            $scope.monthVisible = false;
            //console.log($scope.weekVisible);
        }

        $scope.monthShow = function() {
            //console.log("Clicked1111");
            $scope.weekVisible = false;
            $scope.monthVisible = true;
            //console.log($scope.weekVisible);
        }
		
		// Buttons Functionality
        $scope.active = type;
        if (type == 'MONTH') {
            $scope.monthShow();
            //$scope.monthVisible = $scope.monthVisible ? false : true;
            return monthNames[dateObj.month] + ", " + dateObj.year;
        } else if (type == 'WEEK') {
            $scope.weekShow();
            //$scope.weekVisible = $scope.weekVisible ? false : true;
            return $filter('date')(dateObj.weekFromDate, 'longDate') + " - " + $filter('date')(dateObj.weekToDate, 'longDate');
        }

    };
	
    //function to view next and previous dates.
    $scope.changeValue = function(type, dateObj, flag) {
        var date = new Date(dateObj.year, dateObj.month, dateObj.day)
        switch (type) {
            case 'MONTH':
                flag == "prev" ? angular.extend(dateObj, getDateParts(date.setMonth(date.getMonth() - 1))) : angular.extend(dateObj, getDateParts(date.setMonth(date.getMonth() + 1)));
                break;
            case 'WEEK':
                flag == "prev" ? angular.extend(dateObj, getDateParts(date.setDate(date.getDate() - 7))) : angular.extend(dateObj, getDateParts(date.setDate(date.getDate() + 7)));
                break;
        }
        $scope.displayValue = $scope.getValue(type, dateObj);
        $scope.loadEvents();
    }
	
    $scope.init = function() {
        //console.log("hi");
        $scope.setActiveType('MONTH', $scope.dateObj);
    }


    //Event___________________________________________________
    'use strict';
    $scope.changeMode = function(mode) {
        $scope.mode = mode;
    };

    $scope.$on('eventDateChanged', function() {
        //console.log('date changed');
        for (var i = 0; i < $scope.events.length; i++) {
            $scope.events[i].endTime = $scope.events[i].endsAt;
            $scope.events[i].startTime = $scope.events[i].startsAt;
        }
        $scope.loadEvents();
    });

    $scope.events = [];

    $scope.isToday = function() {
        var today = new Date(),
            currentCalendarDate = new Date($scope.currentDate);
        today.setHours(0, 0, 0, 0);
        currentCalendarDate.setHours(0, 0, 0, 0);
        return today.getTime() === currentCalendarDate.getTime();
    };

    $scope.loadEvents = function() {
        console.log($scope.months);
        $scope.eventSource = $scope.events;
        for (var i = 0; i < $scope.events.length; i++) {
            if ($scope.events[i].startTime > $scope.events[i].endTime) {
                $scope.events[i].isValidEvent = false;
            } else {
                $scope.events[i].isValidEvent = true;
            }
        }

        if ($scope.events.length != 0) {
            for (var i = 0; i < $scope.months.length; i++) {
                for (var j = 0; j < $scope.months[i].length; j++) {
                    if (typeof $scope.months[i][j].day != 'undefined' && $scope.months[i][j].day != "") {
                        for (var k = 0; k < $scope.events.length; k++) {
                            if ($scope.events[k].isValidEvent) {
                                var tempDate = new Date($scope.dateObj.year, $scope.dateObj.month, $scope.months[i][j].day);
                                if (tempDate >= $scope.events[k].startTime && tempDate <= $scope.events[k].endTime) {
                                    $scope.months[i][j].isEvent = true;
                                } else {
                                    $scope.months[i][j].isEvent = false;
                                }
                            }
                        }
                    }
                }
            }
        } else {
            for (var i = 0; i < $scope.months.length; i++) {
                for (var j = 0; j < $scope.months[i].length; j++) {
                    if (typeof $scope.months[i][j].day != 'undefined' && $scope.months[i][j].day != "") {
                        $scope.months[i][j].isEvent = false;
                    }
                }
            }
        }

        //$rootScope.$broadcast('eventSourceChanged', $scope.eventSource);
    };

    $scope.onEventSelected = function(event) {
        $scope.event = event;
    };

    $scope.onTimeSelected = function(selectedTime, events) {
        //console.log('Selected time: ' + selectedTime + ' hasEvents: ' + (events !== undefined && events.length !== 0));
    };

    //These variables MUST be set as a minimum for the calendar to work
    $scope.calendarView = 'month';
    $scope.viewDate = new Date();
    var actions = [{
        label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
        onClick: function(args) {
            alert.show('Edited', args.calendarEvent);
        }
    }, {
        label: '<i class=\'glyphicon glyphicon-remove\'></i>',
        onClick: function(args) {
            alert.show('Deleted', args.calendarEvent);
        }
    }];

    $scope.cellIsOpen = true;

    $scope.addEvent = function() {
        var eventObj = {
            title: 'Deliver your Project to SpiderG',
            startsAt: moment().startOf('day').toDate(),
            endsAt: moment().endOf('day').toDate(),
            startTime: moment().startOf('day').toDate(),
            endTime: moment().endOf('day').toDate(),
            draggable: true,
            resizable: true,
            allDay: false
        };
        $scope.events.push(eventObj);
        $scope.loadEvents();
        console.log("fgdfgdfg" + $scope.events);

        for (i = 0; i < $scope.events.length; i++) {
            console.log($scope.events[i].title);
        }
    };

    $scope.eventClicked = function(event) {
        alert.show('Clicked', event);
    };

    $scope.eventEdited = function(event) {
        alert('edit');
        alert.show('Edited', event);
    };

    $scope.eventDeleted = function(event) {
        alert.show('Deleted', event);
    };

    $scope.eventTimesChanged = function(event) {
        alert.show('Dropped or resized', event);
    };

    $scope.toggle = function($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
        console.log('toggle' + JSON.stringify(event));
    };

    $scope.timespanClicked = function(date, cell) {
        if ($scope.calendarView === 'month') {
            if (($scope.cellIsOpen && moment(date).startOf('day').isSame(moment($scope.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                $scope.cellIsOpen = false;
            } else {
                $scope.cellIsOpen = true;
                $scope.viewDate = date;
            }
        } else if ($scope.calendarView === 'year') {
            if (($scope.cellIsOpen && moment(date).startOf('month').isSame(moment($scope.viewDate).startOf('month'))) || cell.events.length === 0) {
                $scope.cellIsOpen = false;
            } else {
                $scope.cellIsOpen = true;
                $scope.viewDate = date;
            }
        }
        //console.log('timespan');
    };

    $scope.deleteEvent = function(index) {
        $scope.events.splice(index, 1);
        $scope.loadEvents();
    }

    $scope.changeEventTime = function(eventType, eventIndex) {
        if (eventType == 'EndTime') {
            $scope.events[eventIndex].endTime = $scope.events[eventIndex].endsAt;
        } else {
            $scope.events[eventIndex].startTime = $scope.events[eventIndex].startsAt;
        }
        $scope.loadEvents();
    }

}]);

//For Add Items
/*angular.module("app").controller("ListController", ['$scope', function($scope) {
        $scope.personalDetails = [{
                'evtName': 'Vikas',
                'evtStartDate': '2017-07-23',
                'evtEndDate': '2017-06-23'
            },
            {
                'evtName': 'Murtaza',
                'evtStartDate': '2017-06-23',
                'evtEndDate': '2017-06-24'
            }
        ];
    	
    	for (i = 0; i < $scope.personalDetails.length; i++) {
    		console.log($scope.personalDetails[i].evtName);
    	}
    	
    	//$scope.dateStr = JSON.parse($scope.personalDetails.evtStartDate); 
    	
        $scope.addNew = function(personalDetail) {
            $scope.personalDetails.push({
                'evtName': '',
                'evtStartDate': '',
                'evtEndDate': ''
            });
    		
    		console.log($scope.personalDetails);
    //		for (i = 0; i < $scope.personalDetails.length; i++) {
    //			evtStartDate = $scope.personalDetails[i].evtStartDate.value;
    //			abc = Date.parse(evtStartDate);
    //			console.log(abc+" HHHHHHHHHH");
    //		}
    		
    		
    		
        };
    	//var inputDate;
    	$('input[type="date"]').change(function(){
    		alert(this.value);         //Date in full format alert(new Date(this.value));
    		//inputDate = new Date(this.value);
    });
    	
    	//console.log(inputDate);
    	
        $scope.remove = function() {
            var newDataList = [];
            $scope.selectedAll = false;
            angular.forEach($scope.personalDetails, function(selected) {
                if (!selected.selected) {
                    newDataList.push(selected);
                }
            });
            $scope.personalDetails = newDataList;
        };
    
        $scope.checkAll = function() {
            if (!$scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.personalDetails, function(personalDetail) {
                personalDetail.selected = $scope.selectedAll;
            });
        };


}]);


angular.module("app").directive("datepicker", function() {
    return function($scope, element) {
        element.datepicker({
            minDate: 0,
            // dateFormat = ['MMM dd, yyyy hh:mm', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'],
            dateFormat: "yy-mm-dd",
            onSelect: function(y) {
                var edate = element.siblings('.edate');
                edate.datepicker();
                edate.datepicker('option', 'minDate', element.datepicker("getDate"));
                //console.log(edate.datepicker.minDate);
                //console.log($scope.personalDetail.evtStartDate);
                //$(this).val( $(this).datepicker('getDate') );
            }
        });
    };
});*/