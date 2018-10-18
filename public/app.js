angular.module("myApp", ['color.picker']).controller("myCtrl", function ($scope, $http) {
    $scope.background = "E44949";
    $scope.accent = "FFC600";
    $scope.generating = false;

    $scope.icons = [
        {
            'id': 'vscode',
            'name': 'Visual Studio Code',
            'description': 'code development'
        },
        {
            'id': 'atom',
            'name': 'Atom',
            'description': 'code development'
        },
        {
            'id': 'sublime',
            'name': 'Sublime Text',
            'description': 'code development'
        }
    ];
    $scope.icon = {
        'index': 0
    };

    $scope.submit = function () {
        $scope.generating = true;

        var image = document.getElementById("image");
        image = image.outerHTML.replace('{{ background }}', $scope.background);
        image = image.replace(/{{ accent }}/g, $scope.accent);

        $http.post('/api/convert', {'image': image}).then(res => {
            $scope.generating = false;

            name = res.data;
            window.location.href = '/api/download/' + name;
        }, err => {
            console.log(err);
        });
    };

    $scope.pickerOptions = {
        alpha: false,
        format: 'hex',
        swatchOnly: true
    };

});
